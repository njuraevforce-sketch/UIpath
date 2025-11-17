const express = require('express');
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3001;

// ВШИТЫЕ КЛЮЧИ - НЕ МЕНЯТЬ!
const supabaseUrl = 'https://pjyuagmvrhnepomqfxcc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqeXVhZ212cmhwZXBvbXFmeHhjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzE1MjQxMywiZXhwIjoyMDc4NzI4NDEzfQ.cRJ9xx3wganoJQldTL3hbY8OSTIV_XR6f9EIZT4fsac';
const tronGridApiKey = '8fa63ef4-f010-4ad2-a556-a7124563bafd';
const etherscanApiKey = 'HIQGABWWJ77G9B42SZ92HV2QYA7JVGC125';

console.log('✅ Using hardcoded API keys');
const supabase = createClient(supabaseUrl, supabaseKey);

// Конфигурация API
const CONFIG = {
    trc20: {
        apiKey: tronGridApiKey,
        baseURL: 'https://api.trongrid.io',
        usdtContract: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
        delayBetweenRequests: 350
    },
    bep20: {
        apiKey: etherscanApiKey,
        baseURL: 'https://api.etherscan.io/v2/api',
        usdtContract: '0x55d398326f99059ff775485246999027b3197955',
        chainId: 56,
        delayBetweenRequests: 250
    }
};

// Функция задержки
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Батчинг для обработки групп адресов
async function processInBatches(items, batchSize, processFn, delayMs) {
    const results = [];
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        console.log(`🔄 Processing batch ${Math.floor(i/batchSize) + 1} of ${Math.ceil(items.length/batchSize)}`);
        
        const batchResults = await Promise.all(
            batch.map(item => processFn(item))
        );
        results.push(...batchResults);
        
        if (i + batchSize < items.length && delayMs > 0) {
            await delay(delayMs);
        }
    }
    return results;
}

// Оптимизированная проверка TRC20
async function checkTronDeposits() {
    try {
        console.log('🔍 Checking TRC20 deposits...');
        
        const { data: addresses, error } = await supabase
            .from('user_addresses')
            .select('*')
            .eq('network', 'trc20');

        if (error) {
            console.error('Error fetching TRC20 addresses:', error);
            return;
        }

        console.log(`📊 Found ${addresses?.length || 0} TRC20 addresses`);

        if (!addresses || addresses.length === 0) return;

        await processInBatches(
            addresses, 
            3,
            async (address) => {
                try {
                    const response = await axios.get(
                        `${CONFIG.trc20.baseURL}/v1/accounts/${address.address}/transactions/trc20`,
                        {
                            params: {
                                contract_address: CONFIG.trc20.usdtContract,
                                limit: 20,
                                only_to: true,
                                order_by: 'block_timestamp,desc'
                            },
                            headers: {
                                'TRON-PRO-API-KEY': CONFIG.trc20.apiKey
                            },
                            timeout: 10000
                        }
                    );

                    let newDeposits = 0;
                    for (const tx of response.data.data || []) {
                        const processed = await processTransaction(tx, 'trc20', address.user_id);
                        if (processed) newDeposits++;
                    }
                    
                    if (newDeposits > 0) {
                        console.log(`✅ Found ${newDeposits} new TRC20 deposits for ${address.address.substring(0, 10)}...`);
                    }
                    
                    return { success: true, newDeposits };
                } catch (error) {
                    console.error(`❌ Error checking TRC20 address ${address.address}:`, error.message);
                    return { success: false, error: error.message };
                }
            },
            CONFIG.trc20.delayBetweenRequests
        );

    } catch (error) {
        console.error('TRC20 check error:', error.message);
    }
}

// Оптимизированная проверка BEP20
async function checkBscDeposits() {
    try {
        console.log('🔍 Checking BEP20 deposits...');
        
        const { data: addresses, error } = await supabase
            .from('user_addresses')
            .select('*')
            .eq('network', 'bep20');

        if (error) {
            console.error('Error fetching BEP20 addresses:', error);
            return;
        }

        console.log(`📊 Found ${addresses?.length || 0} BEP20 addresses`);

        if (!addresses || addresses.length === 0) return;

        await processInBatches(
            addresses,
            4,
            async (address) => {
                try {
                    const response = await axios.get(CONFIG.bep20.baseURL, {
                        params: {
                            chainid: CONFIG.bep20.chainId,
                            module: 'account',
                            action: 'tokentx',
                            contractaddress: CONFIG.bep20.usdtContract,
                            address: address.address,
                            page: 1,
                            offset: 20,
                            sort: 'desc',
                            apikey: CONFIG.bep20.apiKey
                        },
                        timeout: 10000
                    });

                    if (response.data.status === '1') {
                        let newDeposits = 0;
                        for (const tx of response.data.result) {
                            const processed = await processTransaction(tx, 'bep20', address.user_id);
                            if (processed) newDeposits++;
                        }
                        
                        if (newDeposits > 0) {
                            console.log(`✅ Found ${newDeposits} new BEP20 deposits for ${address.address.substring(0, 10)}...`);
                        }
                        
                        return { success: true, newDeposits };
                    } else {
                        console.log(`⚠️ BSC API error: ${response.data.message}`);
                        return { success: false, error: response.data.message };
                    }
                } catch (error) {
                    console.error(`❌ Error checking BEP20 address ${address.address}:`, error.message);
                    return { success: false, error: error.message };
                }
            },
            CONFIG.bep20.delayBetweenRequests
        );

    } catch (error) {
        console.error('BEP20 check error:', error.message);
    }
}

// Кеш обработанных транзакций
const processedTransactions = new Set();

async function processTransaction(tx, network, userId) {
    try {
        const txHash = network === 'trc20' ? tx.transaction_id : tx.hash;
        
        // Проверяем в кеше
        if (processedTransactions.has(txHash)) {
            return false;
        }

        // Проверяем в базе данных
        const { data: existing } = await supabase
            .from('deposits')
            .select('id')
            .eq('tx_hash', txHash)
            .single();

        if (existing) {
            processedTransactions.add(txHash);
            return false;
        }

        // Определяем сумму
        let amount = 0;
        if (network === 'trc20') {
            amount = parseFloat(tx.value) / 1000000;
        } else if (network === 'bep20') {
            amount = parseFloat(tx.value) / 1000000000000000000;
        }

        // Минимальный депозит 17 USDT
        if (amount >= 17) {
            const depositData = {
                user_id: userId,
                amount: amount,
                tx_hash: txHash,
                network: network,
                status: 'confirmed',
                from_address: network === 'trc20' ? tx.from : tx.from,
                to_address: network === 'trc20' ? tx.to : tx.to,
                created_at: new Date().toISOString()
            };

            const { error: insertError } = await supabase
                .from('deposits')
                .insert([depositData]);

            if (insertError) {
                if (insertError.code === '23505') {
                    processedTransactions.add(txHash);
                    return false;
                }
                console.error('Error inserting deposit:', insertError);
                return false;
            }

            console.log(`🎉 New deposit: ${amount.toFixed(2)} USDT for user ${userId}`);
            
            // Обновляем баланс
            await updateUserBalance(userId, amount);
            
            processedTransactions.add(txHash);
            return true;
        }
        
        return false;
    } catch (error) {
        console.error('Transaction processing error:', error.message);
        return false;
    }
}

// Обновление баланса пользователя
async function updateUserBalance(userId, amount) {
    try {
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('balance')
            .eq('id', userId)
            .single();

        if (userError) {
            console.error('Error fetching user balance:', userError);
            return;
        }

        if (user) {
            const currentBalance = parseFloat(user.balance) || 0;
            const newBalance = currentBalance + amount;
            
            const { error: updateError } = await supabase
                .from('users')
                .update({ balance: newBalance })
                .eq('id', userId);

            if (updateError) {
                console.error('Error updating user balance:', updateError);
            } else {
                console.log(`📊 Balance updated: ${currentBalance.toFixed(2)} → ${newBalance.toFixed(2)} USDT`);
            }
        }
    } catch (error) {
        console.error('Balance update error:', error.message);
    }
}

// Умный мониторинг
async function smartCheckDeposits() {
    const startTime = Date.now();
    console.log(`\n🔄 Starting deposit check at ${new Date().toLocaleTimeString()}`);
    
    try {
        await Promise.all([
            checkTronDeposits(),
            checkBscDeposits()
        ]);
        
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        console.log(`✅ Check completed in ${duration.toFixed(1)} seconds`);
        
    } catch (error) {
        console.error('❌ Smart check error:', error.message);
    }
}

// Запускаем проверку каждые 2 минуты
function startSmartMonitoring() {
    setTimeout(smartCheckDeposits, 5000);
    setInterval(smartCheckDeposits, 2 * 60 * 1000);
}

// Эндпоинты для управления
app.get('/', (req, res) => {
    res.json({ 
        status: 'OK', 
        service: 'UI Deposit Tracker',
        processedTransactions: processedTransactions.size,
        uptime: process.uptime()
    });
});

app.get('/api/check-deposits', async (req, res) => {
    try {
        await smartCheckDeposits();
        res.json({ 
            success: true, 
            message: 'Deposit check completed',
            processedTransactions: processedTransactions.size
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'Deposit Tracker' });
});

app.listen(PORT, () => {
    console.log(`🚀 UI Deposit Tracker running on port ${PORT}`);
    console.log('✅ All hardcoded keys loaded successfully');
    console.log('⚡ Starting monitoring...');
    
    startSmartMonitoring();
});
