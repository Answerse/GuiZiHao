/**
 * ChenPi Tong - i18n Internationalization
 * Manages Chinese/English bilingual switching.
 */
(function () {
  'use strict';

  /* ===========================================
     Translation Dictionary
     =========================================== */
  var translations = {
    en: {
      /* ---- Page Titles ---- */
      'title-index': 'ChenPi Tong - Aged by Time, Treasured by Nature',
      'title-product': '10-Year Vintage Chenpi - ChenPi Tong',

      /* ---- Nav Links (shared) ---- */
      'nav-home': 'Home',
      'nav-products': 'Products',
      'nav-stories': 'Stories',
      'nav-about': 'About Us',

      /* ---- Hero Carousel (index) ---- */
      'hero1-title': 'Aged by Time, Treasured by Nature',
      'hero1-subtitle': 'Naturally aged Chenpi from Pubei, crafted by time and perfected through patience',
      'hero1-cta': 'Explore Our Collection',
      'hero2-title': 'Born in Pubei, Crafted by Nature',
      'hero2-subtitle': 'From one of China\'s renowned Chenpi origins, where sunshine, climate, and time shape every peel',
      'hero2-cta': 'Discover Our Heritage',

      /* ---- About Section (index) ---- */
      'about-subtitle': 'DISCOVER CHENPI',
      'about-title': 'What Is Chenpi?',
      'about-body': 'Chenpi is the dried peel of mature mandarins that has been carefully harvested, sun-dried, and naturally aged over time.\nAs it matures, its aroma, color, and flavor continue to evolve, making it a unique product shaped by the value of time.',

      /* ---- Enjoy Section (index) ---- */
      'enjoy-subtitle': 'WAYS TO ENJOY',
      'enjoy-title': 'How to Enjoy Chenpi',
      'enjoy-card1-title': 'Brew as Tea',
      'enjoy-card1-desc': 'Steep aged Chenpi on its own or blend it with your favorite tea for a rich citrus aroma and smooth finish.',
      'enjoy-card2-title': 'Cook with Flavor',
      'enjoy-card2-desc': 'Add Chenpi to soups, stews, and braised dishes to enhance aroma and depth of flavor.',
      'enjoy-card3-title': 'Bake & Create',
      'enjoy-card3-desc': 'Use Chenpi in desserts, pastries, or creative recipes to add natural citrus notes.',

      /* ---- Why Pu Bei Section (index) ---- */
      'why-subtitle': 'WHY PU BEI',
      'why-title': 'Where Great Chenpi Begins',
      'why-stat1-label': 'Mu Core Plantation',
      'why-stat2-label': 'Tons Storage Capacity',
      'why-stat3-label': 'Traceability System',

      /* ---- Products Section (index) ---- */
      'products-subtitle': 'AGED COLLECTION',
      'products-title': 'Explore by Aging Years',
      'prod10-lg': '10-Year',
      'prod10-sm': 'Vintage Chenpi',
      'prod10-desc': 'A collector\'s grade "liquid gold" for daily wellness and gifting.',
      'prod10-price-unit': '/kg',
      'prod20-lg': '20-Year',
      'prod20-sm': 'Vintage Chenpi',
      'prod20-desc': 'A collector\'s grade "liquid gold" for daily wellness and gifting.',
      'prod20-price-unit': '/kg',
      'prod30-lg': '30-Year',
      'prod30-sm': 'Vintage Chenpi',
      'prod30-desc': 'A collector\'s grade "liquid gold" for daily wellness and gifting.',
      'prod30-price-unit': '/kg',
      'btn-buy': 'Buy',

      /* ---- Heritage Section (index) ---- */
      'heritage-subtitle': 'OUR HERITAGE',
      'heritage-title': 'The Story Of Time',
      'heritage-text': 'True Chenpi cannot be made overnight.\nIt begins with carefully selected mandarins, continues through sunshine and changing seasons, and reaches its finest expression only after years of natural aging.\nEvery year adds depth.\nEvery season leaves its mark.\nThis is the story of time.',

      /* ---- Footer (shared) ---- */
      'footer-home': 'Home',
      'footer-products': 'Products',
      'footer-stories': 'Stories',
      'footer-about': 'About Us',
      'footer-copyright': '\u00A9 All Rights Reserved PuBei ChenPi',

      /* ---- Product Detail (product.html) ---- */
      'pd-name-lg': '10-Year',
      'pd-name-sm': 'Vintage Chenpi',
      'pd-subtitle': 'Naturally Aged Citrus Peel from Pubei, China',
      'pd-tag1': 'SPRING FRESH',
      'pd-tag2': 'CUT GRASS',
      'pd-tag3': 'EDAMAME',
      'pd-benefit1': 'You\'ll earn points with this purchase',
      'pd-benefit2': 'Free UK shipping on orders over \u00A360',
      'pd-description': 'Bursting with sweet spring flavour, and selected for its succulent fresh taste, this is our introduction to exceptional green tea. A refreshing infusion with pleasant, sappy top notes and characterful umami depth.',
      'pd-size-label': 'Choose size:',

      /* ---- Tasting Notes (product.html) ---- */
      'tn-title': 'TASTING NOTES',
      'tn-strength-title': 'Intensity',
      'tn-strength-low': 'Fresh',
      'tn-strength-medium': 'Mellow',
      'tn-strength-high': 'Aged',
      'tn-appearance-label': 'Appearance',
      'tn-appearance-desc': 'Golden brown peel with a naturally textured surface',
      'tn-aroma-label': 'Aroma',
      'tn-aroma-desc': 'Warm citrus zest with gentle woody and herbal notes',
      'tn-taste-label': 'Taste',
      'tn-taste-desc': 'Smooth, mellow, and pleasantly lingering with balanced sweetness.',

      /* ---- How to Prepare (product.html) ---- */
      'htp-title': 'How to Prepare',
      'htp-amount-title': 'Amount',
      'htp-amount-desc': '3\u20135 g Chenpi',
      'htp-water-title': 'Water',
      'htp-water-desc': '95\u2013100\u00B0C',
      'htp-infuse-title': 'Infuse',
      'htp-infuse-desc': '3\u20135 minutes',
      'htp-rebrew-title': 'Rebrew',
      'htp-rebrew-desc': 'Suitable for multiple infusions',

      /* ---- Pubei Story (product.html) ---- */
      'ps-question': 'Where does this cup come from?',
      'ps-title': 'From the Heart of Pubei',
      'ps-desc': 'Located in Guangxi, Pubei is one of China\'s renowned Chenpi-producing regions. Abundant sunshine, seasonal humidity, and patient natural aging create the distinctive aroma and character that define authentic Pubei Chenpi.',
      'ps-info1': 'Cultivar - Chachi',
      'ps-info2': 'Picked - April 2024',
      'ps-info3': 'Nobile Aging Year - 10 Years'
    },

    zh: {
      /* ---- Page Titles ---- */
      'title-index': '陈皮通 - 岁月陈化，自然珍宝',
      'title-product': '十年陈皮 - 陈皮通',

      /* ---- Nav Links (shared) ---- */
      'nav-home': '\u9996\u9875',
      'nav-products': '\u4EA7\u54C1',
      'nav-stories': '\u6545\u4E8B',
      'nav-about': '\u5173\u4E8E\u6211\u4EEC',

      /* ---- Hero Carousel (index) ---- */
      'hero1-title': '\u5C81\u6708\u9648\u5316\uFF0C\u81EA\u7136\u73CD\u5B9D',
      'hero1-subtitle': '\u6765\u81EA\u6D66\u5317\u7684\u81EA\u7136\u9648\u5316\u9648\u76AE\uFF0C\u65F6\u95F4\u96D5\u7422\uFF0C\u8010\u5FC3\u6210\u5C31',
      'hero1-cta': '\u63A2\u7D22\u6211\u4EEC\u7684\u7CFB\u5217',
      'hero2-title': '\u6E90\u8D77\u6D66\u5317\uFF0C\u5929\u5DE5\u9020\u7269',
      'hero2-subtitle': '\u6765\u81EA\u4E2D\u56FD\u8457\u540D\u7684\u9648\u76AE\u53D1\u6E90\u5730\u4E4B\u4E00\uFF0C\u9633\u5149\u3001\u6C14\u5019\u4E0E\u65F6\u95F4\u5171\u540C\u5851\u9020\u6BCF\u4E00\u7247\u9648\u76AE',
      'hero2-cta': '\u4E86\u89E3\u6211\u4EEC\u7684\u4F20\u627F',

      /* ---- About Section (index) ---- */
      'about-subtitle': '\u8BA4\u8BC6\u9648\u76AE',
      'about-title': '\u4EC0\u4E48\u662F\u9648\u76AE\uFF1F',
      'about-body': '\u9648\u76AE\u662F\u6210\u719F\u6A58\u5B50\u7684\u5E72\u679C\u76AE\uFF0C\u7ECF\u8FC7\u7CBE\u5FC3\u91C7\u6458\u3001\u81EA\u7136\u6652\u5E72\u548C\u591A\u5E74\u9648\u5316\u800C\u6210\u3002\u968F\u7740\u65F6\u95F4\u63A8\u79FB\uFF0C\u5176\u9999\u6C14\u3001\u989C\u8272\u548C\u98CE\u5473\u4E0D\u65AD\u6F14\u53D8\uFF0C\u6210\u4E3A\u72EC\u4E00\u65E0\u4E8C\u7684\u5929\u7136\u73CD\u54C1\u3002',

      /* ---- Enjoy Section (index) ---- */
      'enjoy-subtitle': '\u54C1\u9274\u65B9\u5F0F',
      'enjoy-title': '\u5982\u4F55\u54C1\u9274\u9648\u76AE',
      'enjoy-card1-title': '\u6CE1\u8336\u996E\u7528',
      'enjoy-card1-desc': '\u5355\u72EC\u51B2\u6CE1\u9648\u76AE\u6216\u4E0E\u60A8\u559C\u7231\u7684\u8336\u53F6\u6DF7\u5408\uFF0C\u4EAB\u53D7\u6D53\u90C1\u6A58\u9999\u4E0E\u987A\u6ED1\u53E3\u611F\u3002',
      'enjoy-card2-title': '\u70F9\u996A\u589E\u9999',
      'enjoy-card2-desc': '\u5C06\u9648\u76AE\u52A0\u5165\u6C64\u3001\u7096\u83DC\u548C\u7EA2\u70E7\u83DC\u80D4\u4E2D\uFF0C\u63D0\u5347\u9999\u6C14\u548C\u98CE\u5473\u5C42\u6B21\u3002',
      'enjoy-card3-title': '\u70D8\u7119\u521B\u4F5C',
      'enjoy-card3-desc': '\u5C06\u9648\u76AE\u7528\u4E8E\u751C\u54C1\u3001\u7CD5\u70B9\u6216\u521B\u610F\u6599\u7406\u4E2D\uFF0C\u589E\u6DFB\u5929\u7136\u6A58\u9999\u3002',

      /* ---- Why Pu Bei Section (index) ---- */
      'why-subtitle': '\u4E3A\u4F55\u9009\u62E9\u6D66\u5317',
      'why-title': '\u4F18\u8D28\u9648\u76AE\u7684\u53D1\u6E90\u5730',
      'why-stat1-label': '\u4EA9\u6838\u5FC3\u79CD\u690D\u56ED',
      'why-stat2-label': '\u5428\u50A8\u5B58\u5BB9\u91CF',
      'why-stat3-label': '\u53EF\u8FFD\u6EAF\u4F53\u7CFB',

      /* ---- Products Section (index) ---- */
      'products-subtitle': '\u5E74\u4EFD\u7CFB\u5217',
      'products-title': '\u6309\u5E74\u4EFD\u63A2\u7D22',
      'prod10-lg': '\u5341\u5E74',
      'prod10-sm': '\u9648\u76AE',
      'prod10-desc': '\u6536\u85CF\u7EA7\u201C\u5929\u7136\u9EC4\u91D1\u201D\uFF0C\u9002\u5408\u65E5\u5E38\u517B\u751F\u4E0E\u9988\u8D60\u4EB2\u53CB\u3002',
      'prod10-price-unit': '/\u516C\u65A4',
      'prod20-lg': '\u4E8C\u5341\u5E74',
      'prod20-sm': '\u9648\u76AE',
      'prod20-desc': '\u6536\u85CF\u7EA7\u201C\u5929\u7136\u9EC4\u91D1\u201D\uFF0C\u9002\u5408\u65E5\u5E38\u517B\u751F\u4E0E\u9988\u8D60\u4EB2\u53CB\u3002',
      'prod20-price-unit': '/\u516C\u65A4',
      'prod30-lg': '\u4E09\u5341\u5E74',
      'prod30-sm': '\u9648\u76AE',
      'prod30-desc': '\u6536\u85CF\u7EA7\u201C\u5929\u7136\u9EC4\u91D1\u201D\uFF0C\u9002\u5408\u65E5\u5E38\u517B\u751F\u4E0E\u9988\u8D60\u4EB2\u53CB\u3002',
      'prod30-price-unit': '/\u516C\u65A4',
      'btn-buy': '\u8D2D\u4E70',

      /* ---- Heritage Section (index) ---- */
      'heritage-subtitle': '\u6211\u4EEC\u7684\u4F20\u627F',
      'heritage-title': '\u65F6\u95F4\u7684\u6545\u4E8B',
      'heritage-text': '\u771F\u6B63\u7684\u9648\u76AE\u5E76\u975E\u4E00\u671D\u4E00\u5915\u53EF\u4EE5\u5236\u6210\u3002\u5B83\u59CB\u4E8E\u7CBE\u5FC3\u6311\u9009\u7684\u6A58\u5B50\uFF0C\u7ECF\u5386\u9633\u5149\u4E0E\u56DB\u5B63\u66F4\u8FED\uFF0C\u552F\u6709\u7ECF\u8FC7\u591A\u5E74\u81EA\u7136\u9648\u5316\uFF0C\u65B9\u80FD\u8FBE\u5230\u6700\u6781\u81F4\u7684\u8868\u8FBE\u3002\n\u6BCF\u4E00\u5E74\u90FD\u5728\u589E\u6DFB\u539A\u5EA6\u3002\n\u6BCF\u4E00\u5B63\u90FD\u5728\u7559\u4E0B\u75D5\u8FF9\u3002\n\u8FD9\u5C31\u662F\u65F6\u95F4\u7684\u6545\u4E8B\u3002',

      /* ---- Footer (shared) ---- */
      'footer-home': '\u9996\u9875',
      'footer-products': '\u4EA7\u54C1',
      'footer-stories': '\u6545\u4E8B',
      'footer-about': '\u5173\u4E8E\u6211\u4EEC',
      'footer-copyright': '\u00A9 \u6D66\u5317\u9648\u76AE \u7248\u6743\u6240\u6709',

      /* ---- Product Detail (product.html) ---- */
      'pd-name-lg': '\u5341\u5E74',
      'pd-name-sm': '\u9648\u76AE',
      'pd-subtitle': '\u6765\u81EA\u4E2D\u56FD\u6D66\u5317\uFF0C\u81EA\u7136\u9648\u5316\u6A58\u76AE',
      'pd-tag1': '\u6625\u65E5\u9C9C\u9999',
      'pd-tag2': '\u9752\u8349\u6C14\u606F',
      'pd-tag3': '\u6BDB\u8C46\u6E05\u9999',
      'pd-benefit1': '\u8D2D\u4E70\u6B64\u5546\u54C1\u53EF\u83B7\u79EF\u5206',
      'pd-benefit2': '\u6EE1\u00A360\u82F1\u56FD\u514D\u8FD0\u8D39',
      'pd-description': '\u8FD9\u6B3E\u8336\u53E3\u611F\u7518\u751C\uFF0C\u5E26\u6709\u6E05\u65B0\u6625\u65E5\u7684\u6C14\u606F\uFF0C\u679C\u8089\u9971\u6EE1\u591A\u6C41\u3002\u8FD9\u662F\u6211\u4EEC\u5BF9\u4F18\u8D28\u7EFF\u8336\u7684\u521D\u6B21\u5448\u73B0\uFF0C\u6E05\u65B0\u6021\u4EBA\uFF0C\u5E26\u6709\u6E05\u65B0\u7684\u9752\u8349\u9999\u8C03\u548C\u6D53\u90C1\u7684\u9C9C\u5473\u6DF1\u5EA6\u3002',
      'pd-size-label': '\u9009\u62E9\u89C4\u683C\uFF1A',

      /* ---- Tasting Notes (product.html) ---- */
      'tn-title': '\u54C1\u9274\u8BB0\u5F55',
      'tn-strength-title': '\u5F3A\u5EA6',
      'tn-strength-low': '\u6E05\u65B0',
      'tn-strength-medium': '\u9187\u548C',
      'tn-strength-high': '\u9648\u5E74',
      'tn-appearance-label': '\u5916\u89C2',
      'tn-appearance-desc': '\u91D1\u68D5\u8272\u9648\u76AE\uFF0C\u5929\u7136\u7EB9\u7406\u8868\u9762',
      'tn-aroma-label': '\u9999\u6C14',
      'tn-aroma-desc': '\u6E29\u6696\u67D1\u6A58\u9999\uFF0C\u4F34\u6709\u6DE1\u6DE1\u7684\u6728\u8D28\u548C\u8349\u672C\u6C14\u606F',
      'tn-taste-label': '\u53E3\u611F',
      'tn-taste-desc': '\u987A\u6ED1\u9187\u539A\uFF0C\u4F59\u5473\u60A0\u957F\uFF0C\u751C\u5EA6\u5747\u8861\u3002',

      /* ---- How to Prepare (product.html) ---- */
      'htp-title': '\u51B2\u6CE1\u6307\u5357',
      'htp-amount-title': '\u7528\u91CF',
      'htp-amount-desc': '3-5 \u514B\u9648\u76AE',
      'htp-water-title': '\u6C34\u6E29',
      'htp-water-desc': '95-100\u00B0C',
      'htp-infuse-title': '\u6D78\u6CE1',
      'htp-infuse-desc': '3-5 \u5206\u949F',
      'htp-rebrew-title': '\u7EED\u6CE1',
      'htp-rebrew-desc': '\u9002\u5408\u591A\u6B21\u51B2\u6CE1',

      /* ---- Pubei Story (product.html) ---- */
      'ps-question': '\u8FD9\u676F\u8336\u6765\u81EA\u54EA\u91CC\uFF1F',
      'ps-title': '\u6765\u81EA\u6D66\u5317\u4E4B\u5FC3',
      'ps-desc': '\u6D66\u5317\u4F4D\u4E8E\u5E7F\u897F\uFF0C\u662F\u4E2D\u56FD\u8457\u540D\u7684\u9648\u76AE\u4EA7\u533A\u4E4B\u4E00\u3002\u5145\u8DB3\u7684\u65E5\u7167\u3001\u5B63\u8282\u6027\u7684\u6E7F\u5EA6\u548C\u8010\u5FC3\u7684\u81EA\u7136\u9648\u5316\uFF0C\u521B\u9020\u4E86\u5B9A\u4E49\u6B63\u5B97\u6D66\u5317\u9648\u76AE\u7684\u72EC\u7279\u9999\u6C14\u548C\u98CE\u5473\u3002',
      'ps-info1': '\u54C1\u79CD - \u8336\u679D\u67D1',
      'ps-info2': '\u91C7\u6458 - 2024\u5E744\u6708',
      'ps-info3': '\u9648\u5316\u5E74\u4EFD - \u5341\u5E74'
    }
  };

  var STORAGE_KEY = 'chenpitong-lang';
  var currentLang = 'en';

  /**
   * Get saved language from localStorage.
   */
  function getSavedLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'zh' || saved === 'en') return saved;
    } catch (e) { /* ignore */ }
    return 'en';
  }

  /**
   * Save language preference to localStorage.
   */
  function saveLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) { /* ignore */ }
  }

  /**
   * Apply translations to all elements with data-i18n attribute.
   * Also handles data-i18n-html for innerHTML updates.
   */
  function applyTranslations(lang) {
    currentLang = lang;
    var dict = translations[lang];
    if (!dict) return;

    /* Update all [data-i18n] elements */
    var elements = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      var key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        /* Preserve newlines in block text */
        if (dict[key].indexOf('\n') !== -1) {
          el.innerHTML = dict[key].replace(/\n/g, '<br>');
        } else {
          el.textContent = dict[key];
        }
      }
    }

    /* Update <title> if applicable */
    var titleEl = document.querySelector('title[data-i18n]');
    if (titleEl) {
      var tKey = titleEl.getAttribute('data-i18n');
      if (dict[tKey] !== undefined) {
        titleEl.textContent = dict[tKey];
      }
    }

    /* Update html lang attribute */
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  }

  /**
   * Update language selector button text and active state.
   */
  function updateSelectorUI(lang) {
    var selectors = document.querySelectorAll('.lang-selector');
    for (var s = 0; s < selectors.length; s++) {
      var currentSpan = selectors[s].querySelector('.lang-selector__current');
      if (currentSpan) {
        currentSpan.textContent = lang === 'en' ? 'English' : '中文';
      }
      var options = selectors[s].querySelectorAll('.lang-selector__option');
      for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var optLang = opt.getAttribute('data-lang');
        if (optLang === lang) {
          opt.classList.add('lang-selector__option--active');
        } else {
          opt.classList.remove('lang-selector__option--active');
        }
      }
    }
  }

  /**
   * Close dropdown when clicking outside.
   */
  function closeOnOutsideClick(e) {
    var selectors = document.querySelectorAll('.lang-selector--open');
    for (var i = 0; i < selectors.length; i++) {
      if (!selectors[i].contains(e.target)) {
        selectors[i].classList.remove('lang-selector--open');
      }
    }
  }

  /**
   * Switch language.
   */
  function switchLanguage(lang) {
    if (lang === currentLang) return;
    saveLang(lang);
    applyTranslations(lang);
    updateSelectorUI(lang);
  }

  /**
   * Initialize language selector dropdown behavior.
   */
  function initDropdowns() {
    var selectors = document.querySelectorAll('.lang-selector');
    for (var i = 0; i < selectors.length; i++) {
      (function (wrap) {
        var btn = wrap.querySelector('.lang-selector__btn');
        if (!btn) return;

        /* Toggle dropdown on button click */
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          wrap.classList.toggle('lang-selector--open');
        });

        /* Handle option clicks */
        var options = wrap.querySelectorAll('.lang-selector__option');
        for (var j = 0; j < options.length; j++) {
          (function (opt) {
            opt.addEventListener('click', function (e) {
              e.stopPropagation();
              var lang = opt.getAttribute('data-lang');
              switchLanguage(lang);
              /* Close all dropdowns */
              var openSelectors = document.querySelectorAll('.lang-selector--open');
              for (var k = 0; k < openSelectors.length; k++) {
                openSelectors[k].classList.remove('lang-selector--open');
              }
            });
          })(options[j]);
        }
      })(selectors[i]);
    }

    /* Close on outside click */
    document.addEventListener('click', closeOnOutsideClick);
  }

  /**
   * Initialize i18n system.
   */
  function init() {
    var lang = getSavedLang();
    applyTranslations(lang);
    updateSelectorUI(lang);
    initDropdowns();
  }

  /* Run on DOM ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
