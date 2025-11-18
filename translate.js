// translate.js
const translations = {
    en: {
        // Login Page
        "login": "Login",
        "register": "Register",
        "username": "Username",
        "password": "Password",
        "email": "Email",
        "confirm_password": "Confirm Password",
        "payment_password": "Payment Password",
        "referral_code": "Referral Code",
        "optional": "optional",
        "enter_username": "Enter username",
        "enter_password": "Enter password",
        "enter_email": "Enter email",
        "enter_payment_password": "Enter payment password",
        "enter_referral_code": "Enter referral code",
        "password_length_error": "Password must be at least 6 characters",
        "passwords_dont_match": "Passwords don't match",
        "payment_password_length_error": "Payment password must be at least 4 characters",
        "enter_username_error": "Enter username",
        "enter_password_error": "Enter password",
        "enter_email_error": "Enter email",
        "invalid_credentials": "Invalid login credentials",
        "login_error": "Login error occurred. Please try again.",
        "registration_bonus": "Congratulations! You received 3.00 USDT registration bonus!",
        "registration_error": "Registration error occurred. Please try again.",
        "username_exists": "Username or email already exists",
        "invalid_referral": "Invalid referral code",
        
        // Dashboard
        "home": "Home",
        "vip": "VIP",
        "assets": "Assets",
        "profile": "Profile",
        "deposit": "Deposit",
        "withdraw": "Withdraw",
        "team": "Team",
        "task_center": "Task Center",
        "invite_friends": "Invite Friends",
        "history": "History",
        "download": "Download",
        "license": "License",
        "total_balance": "Total Balance",
        "from_referrals": "From Referrals",
        "from_bonuses": "From Bonuses",
        "from_quantification": "From Quantification",
        "available": "Available",
        "transaction_history": "Transaction History",
        "all": "All",
        "deposits": "Deposits",
        "withdrawals": "Withdrawals",
        "referrals": "Referrals",
        "quantification": "Quantification",
        "no_transactions": "No transactions found",
        "loading_transactions": "Loading transactions...",
        "1st_generation": "1st Generation",
        "2nd_generation": "2nd Generation",
        "3rd_generation": "3rd Generation",
        "from_1st_generation": "8% from 1st Generation",
        "from_2nd_generation": "3% from 2nd Generation",
        "from_3rd_generation": "1% from 3rd Generation",
        "loading_referrals": "Loading referrals...",
        "no_referrals": "No referrals yet. Share your referral link to invite friends!",
        "vip_packages": "VIP Packages",
        "vip_package_rules": "VIP Package Rules:",
        "vip_rules_1": "VIP packages are active for exactly 30 days",
        "vip_rules_2": "Daily income: VIP1: 2.6% (0.52 USDT) | VIP2: 3.1% (3.10 USDT) | VIP3: 3.6% (10.80 USDT) | VIP4: 4.1% (41.00 USDT) | VIP5: 4.6% (138.00 USDT) | VIP6: 5.1% (255.00 USDT)",
        "vip_rules_3": "Package price is returned to your balance after 30 days automatically",
        "vip_rules_4": "Package expires after 30 days - to continue earning, purchase again",
        "vip_rules_5": "You can claim daily income once per day at 22:00 UTC",
        "vip_rules_6": "If you don't claim income today, you can claim it until 22:00 UTC tomorrow",
        "vip_rules_7": "Income doesn't accumulate - use it or lose it!",
        "vip_rules_8": "Higher packages give +0.5% daily income compared to previous level",
        "current_status": "Current Status",
        "purchase_package": "Purchase a package to access premium features",
        "available_for_withdrawal": "Available for withdrawal",
        "today": "today",
        "claim_income": "CLAIM INCOME",
        "no_available_income": "NO AVAILABLE INCOME",
        "already_claimed": "ALREADY CLAIMED",
        "buy_vip_package": "Buy a VIP package to earn income",
        "next_claim": "Next claim",
        "available_for": "Available for",
        "analysis": "Analysis",
        "processing": "Processing",
        "completion": "Completion",
        "change_password": "Change Password",
        "current_password": "Current Password",
        "new_password": "New Password",
        "confirm_new_password": "Confirm New Password",
        "update_password": "Update Password",
        "identity_verification": "Identity Verification",
        "phone_number": "Phone Number",
        "not_verified": "Not verified",
        "verified": "Verified",
        "verify": "Verify",
        "id_passport": "ID/Passport",
        "logout": "Logout",
        "your_bonuses": "Your Bonuses",
        "how_it_works": "How it works:",
        "referral_works_1": "8% from 1st generation deposits",
        "referral_works_2": "3% from 2nd generation deposits",
        "referral_works_3": "1% from 3rd generation deposits",
        "referral_works_4": "Income credited instantly when referrals purchase VIP packages",
        "available_bonuses": "Available Bonuses",
        "complete_tasks": "Complete tasks and earn additional rewards",
        "task": "Task",
        "bonus": "Bonus",
        "status": "Status",
        "registration_bonus_task": "Registration Bonus",
        "purchase_vip2": "Purchase VIP 2 Package",
        "purchase_vip3": "Purchase VIP 3 Package",
        "purchase_vip4": "Purchase VIP 4 Package",
        "1st_gen_deposit_50": "1st Generation Deposit 50 USDT",
        "1st_gen_deposit_100": "1st Generation Deposit 100 USDT",
        "1st_gen_deposit_300": "1st Generation Deposit 300 USDT",
        "1st_gen_deposit_1000": "1st Generation Deposit 1000 USDT",
        "completed": "Completed",
        "available_task": "Available",
        "terms_conditions": "Terms & Conditions:",
        "terms_1": "All bonuses are credited manually by administration",
        "terms_2": "VIP purchase bonuses are awarded after successful package activation",
        "terms_3": "Referral deposit bonuses require minimum deposit amounts from 1st generation users",
        "terms_4": "Bonuses are paid in USDT equivalent",
        "terms_5": "Administration reserves the right to modify bonus terms",
        "license_documents": "License & Documents",
        "official_financial_license": "OFFICIAL FINANCIAL LICENSE",
        "certificate_authorization": "Certificate of Authorization",
        "license_number": "License Number",
        "company_name": "Company Name",
        "registration_address": "Registration Address",
        "date_issue": "Date of Issue",
        "valid_until": "Valid Until",
        "regulatory_body": "Regulatory Body",
        "authorized_signature": "Authorized Signature",
        "director_licensing": "Director of Licensing",
        "official_seal": "Official Regulatory Seal",
        "supporting_documents": "Supporting Documents",
        "financial_report": "Financial Report 2024",
        "annual_audit": "Annual Audit Statement",
        "insurance_certificate": "Insurance Certificate",
        "client_fund_protection": "Client Fund Protection",
        "legal_information": "Legal Information",
        "verified_license": "VERIFIED LICENSE • VALID UNTIL 2037",
        "copy": "Copy",
        "copied": "Copied!",
        "logout_confirm": "Are you sure you want to logout?",
        "cancel": "Cancel",
        "confirm": "Confirm",
        "active": "ACTIVE",
        "buy": "BUY"
    },
    es: {
        // Spanish translations
        "login": "Iniciar Sesión",
        "register": "Registrarse",
        "username": "Usuario",
        "password": "Contraseña",
        "email": "Correo Electrónico",
        "confirm_password": "Confirmar Contraseña",
        "payment_password": "Contraseña de Pago",
        "referral_code": "Código de Referido",
        "optional": "opcional",
        "enter_username": "Ingrese usuario",
        "enter_password": "Ingrese contraseña",
        "enter_email": "Ingrese correo electrónico",
        "enter_payment_password": "Ingrese contraseña de pago",
        "enter_referral_code": "Ingrese código de referido",
        // ... остальные переводы для испанского
    },
    de: {
        // German translations
        "login": "Anmelden",
        "register": "Registrieren",
        "username": "Benutzername",
        "password": "Passwort",
        // ... остальные переводы для немецкого
    },
    pl: {
        // Polish translations
        "login": "Zaloguj się",
        "register": "Zarejestruj się",
        "username": "Nazwa użytkownika",
        "password": "Hasło",
        // ... остальные переводы для польского
    },
    ru: {
        // Russian translations
        "login": "Войти",
        "register": "Регистрация",
        "username": "Имя пользователя",
        "password": "Пароль",
        "email": "Электронная почта",
        "confirm_password": "Подтвердите пароль",
        "payment_password": "Платежный пароль",
        "referral_code": "Реферальный код",
        "optional": "необязательно",
        "enter_username": "Введите имя пользователя",
        "enter_password": "Введите пароль",
        "enter_email": "Введите электронную почту",
        "enter_payment_password": "Введите платежный пароль",
        "enter_referral_code": "Введите реферальный код",
        "password_length_error": "Пароль должен быть не менее 6 символов",
        "passwords_dont_match": "Пароли не совпадают",
        "payment_password_length_error": "Платежный пароль должен быть не менее 4 символов",
        "enter_username_error": "Введите имя пользователя",
        "enter_password_error": "Введите пароль",
        "enter_email_error": "Введите электронную почту",
        "invalid_credentials": "Неверные учетные данные",
        "login_error": "Ошибка входа. Пожалуйста, попробуйте снова.",
        "registration_bonus": "Поздравляем! Вы получили 3.00 USDT бонус за регистрацию!",
        "registration_error": "Ошибка регистрации. Пожалуйста, попробуйте снова.",
        "username_exists": "Имя пользователя или электронная почта уже существуют",
        "invalid_referral": "Неверный реферальный код",
        
        // Dashboard
        "home": "Главная",
        "vip": "VIP",
        "assets": "Активы",
        "profile": "Профиль",
        "deposit": "Пополнить",
        "withdraw": "Вывести",
        "team": "Команда",
        "task_center": "Центр заданий",
        "invite_friends": "Пригласить друзей",
        "history": "История",
        "download": "Скачать",
        "license": "Лицензия",
        "total_balance": "Общий баланс",
        "from_referrals": "От рефералов",
        "from_bonuses": "От бонусов",
        "from_quantification": "От квантификации",
        "available": "Доступно",
        "transaction_history": "История транзакций",
        "all": "Все",
        "deposits": "Пополнения",
        "withdrawals": "Выводы",
        "referrals": "Рефералы",
        "quantification": "Квантификация",
        "no_transactions": "Транзакции не найдены",
        "loading_transactions": "Загрузка транзакций...",
        "1st_generation": "1-е поколение",
        "2nd_generation": "2-е поколение",
        "3rd_generation": "3-е поколение",
        "from_1st_generation": "8% от 1-го поколения",
        "from_2nd_generation": "3% от 2-го поколения",
        "from_3rd_generation": "1% от 3-го поколения",
        "loading_referrals": "Загрузка рефералов...",
        "no_referrals": "Пока нет рефералов. Поделитесь своей реферальной ссылкой, чтобы пригласить друзей!",
        "vip_packages": "VIP Пакеты",
        "vip_package_rules": "Правила VIP пакетов:",
        "vip_rules_1": "VIP пакеты активны ровно 30 дней",
        "vip_rules_2": "Ежедневный доход: VIP1: 2.6% (0.52 USDT) | VIP2: 3.1% (3.10 USDT) | VIP3: 3.6% (10.80 USDT) | VIP4: 4.1% (41.00 USDT) | VIP5: 4.6% (138.00 USDT) | VIP6: 5.1% (255.00 USDT)",
        "vip_rules_3": "Стоимость пакета возвращается на ваш баланс через 30 дней автоматически",
        "vip_rules_4": "Пакет истекает через 30 дней - чтобы продолжить зарабатывать, приобретите снова",
        "vip_rules_5": "Вы можете забирать ежедневный доход один раз в день в 22:00 UTC",
        "vip_rules_6": "Если вы не забрали доход сегодня, вы можете забрать его до 22:00 UTC завтра",
        "vip_rules_7": "Доход не накапливается - используйте его или теряйте!",
        "vip_rules_8": "Высшие пакеты дают +0.5% ежедневного дохода по сравнению с предыдущим уровнем",
        "current_status": "Текущий статус",
        "purchase_package": "Приобретите пакет для доступа к премиум функциям",
        "available_for_withdrawal": "Доступно для вывода",
        "today": "сегодня",
        "claim_income": "ЗАБРАТЬ ДОХОД",
        "no_available_income": "НЕТ ДОСТУПНОГО ДОХОДА",
        "already_claimed": "УЖЕ ЗАБРАНО",
        "buy_vip_package": "Купите VIP пакет, чтобы начать зарабатывать",
        "next_claim": "Следующий забор",
        "available_for": "Доступно для",
        "analysis": "Анализ",
        "processing": "Обработка",
        "completion": "Завершение",
        "change_password": "Изменить пароль",
        "current_password": "Текущий пароль",
        "new_password": "Новый пароль",
        "confirm_new_password": "Подтвердите новый пароль",
        "update_password": "Обновить пароль",
        "identity_verification": "Верификация личности",
        "phone_number": "Номер телефона",
        "not_verified": "Не верифицирован",
        "verified": "Верифицирован",
        "verify": "Верифицировать",
        "id_passport": "ID/Паспорт",
        "logout": "Выйти",
        "your_bonuses": "Ваши бонусы",
        "how_it_works": "Как это работает:",
        "referral_works_1": "8% от депозитов 1-го поколения",
        "referral_works_2": "3% от депозитов 2-го поколения",
        "referral_works_3": "1% от депозитов 3-го поколения",
        "referral_works_4": "Доход зачисляется мгновенно, когда рефералы покупают VIP пакеты",
        "available_bonuses": "Доступные бонусы",
        "complete_tasks": "Выполняйте задания и получайте дополнительные награды",
        "task": "Задание",
        "bonus": "Бонус",
        "status": "Статус",
        "registration_bonus_task": "Бонус за регистрацию",
        "purchase_vip2": "Покупка VIP 2 Пакета",
        "purchase_vip3": "Покупка VIP 3 Пакета",
        "purchase_vip4": "Покупка VIP 4 Пакета",
        "1st_gen_deposit_50": "Депозит 1-го поколения 50 USDT",
        "1st_gen_deposit_100": "Депозит 1-го поколения 100 USDT",
        "1st_gen_deposit_300": "Депозит 1-го поколения 300 USDT",
        "1st_gen_deposit_1000": "Депозит 1-го поколения 1000 USDT",
        "completed": "Выполнено",
        "available_task": "Доступно",
        "terms_conditions": "Условия и положения:",
        "terms_1": "Все бонусы зачисляются вручную администрацией",
        "terms_2": "Бонусы за покупку VIP начисляются после успешной активации пакета",
        "terms_3": "Бонусы за депозиты рефералов требуют минимальных сумм депозитов от пользователей 1-го поколения",
        "terms_4": "Бонусы выплачиваются в эквиваленте USDT",
        "terms_5": "Администрация оставляет за собой право изменять условия бонусов",
        "license_documents": "Лицензия и Документы",
        "official_financial_license": "ОФИЦИАЛЬНАЯ ФИНАНСОВАЯ ЛИЦЕНЗИЯ",
        "certificate_authorization": "Сертификат Авторизации",
        "license_number": "Номер лицензии",
        "company_name": "Название компании",
        "registration_address": "Адрес регистрации",
        "date_issue": "Дата выдачи",
        "valid_until": "Действительна до",
        "regulatory_body": "Регулирующий орган",
        "authorized_signature": "Авторизованная подпись",
        "director_licensing": "Директор по лицензированию",
        "official_seal": "Официальная печать регулятора",
        "supporting_documents": "Поддерживающие документы",
        "financial_report": "Финансовый отчет 2024",
        "annual_audit": "Годовой аудиторский отчет",
        "insurance_certificate": "Сертификат страхования",
        "client_fund_protection": "Защита клиентских средств",
        "legal_information": "Юридическая информация",
        "verified_license": "ПРОВЕРЕННАЯ ЛИЦЕНЗИЯ • ДЕЙСТВИТЕЛЬНА ДО 2037",
        "copy": "Копировать",
        "copied": "Скопировано!",
        "logout_confirm": "Вы уверены, что хотите выйти?",
        "cancel": "Отмена",
        "confirm": "Подтвердить",
        "active": "АКТИВНО",
        "buy": "КУПИТЬ"
    },
    tr: {
        // Turkish translations
        "login": "Giriş Yap",
        "register": "Kayıt Ol",
        "username": "Kullanıcı Adı",
        "password": "Şifre",
        // ... остальные переводы для турецкого
    },
    ar: {
        // Arabic translations
        "login": "تسجيل الدخول",
        "register": "تسجيل",
        "username": "اسم المستخدم",
        "password": "كلمة المرور",
        // ... остальные переводы для арабского
    },
    ro: {
        // Romanian translations
        "login": "Autentificare",
        "register": "Înregistrare",
        "username": "Nume utilizator",
        "password": "Parolă",
        // ... остальные переводы для румынского
    },
    uk: {
        // Ukrainian translations
        "login": "Увійти",
        "register": "Реєстрація",
        "username": "Ім'я користувача",
        "password": "Пароль",
        // ... остальные переводы для украинского
    },
    fr: {
        // French translations
        "login": "Connexion",
        "register": "S'inscrire",
        "username": "Nom d'utilisateur",
        "password": "Mot de passe",
        // ... остальные переводы для французского
    },
    it: {
        // Italian translations
        "login": "Accedi",
        "register": "Registrati",
        "username": "Nome utente",
        "password": "Password",
        // ... остальные переводы для итальянского
    }
};

let currentLanguage = 'en';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);
    applyTranslations();
    updateLanguageSelector();
}

function applyTranslations() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            if (element.tagName === 'INPUT' && element.type !== 'button' && element.type !== 'submit') {
                element.placeholder = translations[currentLanguage][key];
            } else {
                element.textContent = translations[currentLanguage][key];
            }
        }
    });
}

function updateLanguageSelector() {
    const selector = document.querySelector('.language-selector');
    if (selector) {
        const currentFlag = selector.querySelector('.current-flag');
        if (currentFlag) {
            currentFlag.textContent = getFlagEmoji(currentLanguage);
        }
    }
}

function getFlagEmoji(lang) {
    const flagEmojis = {
        'en': '🇺🇸',
        'es': '🇪🇸', 
        'de': '🇩🇪',
        'pl': '🇵🇱',
        'ru': '🇷🇺',
        'tr': '🇹🇷',
        'ar': '🇸🇦',
        'ro': '🇷🇴',
        'uk': '🇺🇦',
        'fr': '🇫🇷',
        'it': '🇮🇹'
    };
    return flagEmojis[lang] || '🌐';
}

function toggleLanguageMenu() {
    const menu = document.getElementById('languageMenu');
    if (menu) {
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }
}

function closeLanguageMenu() {
    const menu = document.getElementById('languageMenu');
    if (menu) {
        menu.style.display = 'none';
    }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(savedLanguage);
    
    // Close language menu when clicking outside
    document.addEventListener('click', function(event) {
        const selector = document.querySelector('.language-selector');
        if (selector && !selector.contains(event.target)) {
            closeLanguageMenu();
        }
    });
});
