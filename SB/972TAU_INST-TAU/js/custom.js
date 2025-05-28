(function(){
"use strict";
'use strict';

var app = angular.module('viewCustom', ['angularLoad', 'externalSearch']);
var LOCAL_VID = "972TAU_INST-TAU"

    
    console.log('=== CUSTOM.JS: Module loaded ===');
	// Begin BrowZine - Primo Integration...
var primolang = location.search.match(/lang=he/) ? 'he' : 'en';
if (primolang == "he") {
	window.browzine = {
    api: "https://public-api.thirdiron.com/public/v1/libraries/2584",
    apiKey: "2f91474a-da99-4018-8c5c-90c8bf1a611a",
 
    journalCoverImagesEnabled: true,
 
    journalBrowZineWebLinkTextEnabled: true,
    journalBrowZineWebLinkText: "צפייה בכתב העת",
 
    articleBrowZineWebLinkTextEnabled: true,
    articleBrowZineWebLinkText: "צפייה בתוכן העניינים",
 
    articlePDFDownloadLinkEnabled: true,
    articlePDFDownloadLinkText: "הורדת מאמר",
 
    articleLinkEnabled: true,
    articleLinkText: "קריאת מאמר",
 
    printRecordsIntegrationEnabled: true,
	showFormatChoice: true,
 
    unpaywallEmailAddressKey: "hagaybar@tauex.tau.ac.il",
 
    articlePDFDownloadViaUnpaywallEnabled: true,
    articlePDFDownloadViaUnpaywallText: "הורדת מאמר (באמצעות גישה פתוחה)",
 
    articleLinkViaUnpaywallEnabled: true,
    articleLinkViaUnpaywallText: "קריאת מאמר (באמצעות גישה פתוחה)",
 
    articleAcceptedManuscriptPDFViaUnpaywallEnabled: true,
    articleAcceptedManuscriptPDFViaUnpaywallText: "הורדת מאמר (כתב יד שהתקבל, דרך גישה פתוחה)",
 
    articleAcceptedManuscriptArticleLinkViaUnpaywallEnabled: true,
    articleAcceptedManuscriptArticleLinkViaUnpaywallText: "קריאת מאמר (כתב יד שהתקבל, דרך גישה פתוחה)",
  };
	
} else {
		window.browzine = {
    api: "https://public-api.thirdiron.com/public/v1/libraries/2584",
    apiKey: "2f91474a-da99-4018-8c5c-90c8bf1a611a",
 
    journalCoverImagesEnabled: true,
 
    journalBrowZineWebLinkTextEnabled: true,
    journalBrowZineWebLinkText: "View Journal Contents",
 
    articleBrowZineWebLinkTextEnabled: true,
    articleBrowZineWebLinkText: "View Issue Contents",
 
    articlePDFDownloadLinkEnabled: true,
    articlePDFDownloadLinkText: "Download PDF",
 
    articleLinkEnabled: true,
    articleLinkText: "Read Article",
 
    printRecordsIntegrationEnabled: true,
	showFormatChoice: true,
 
    unpaywallEmailAddressKey: "hagaybar@tauex.tau.ac.il",
 
    articlePDFDownloadViaUnpaywallEnabled: true,
    articlePDFDownloadViaUnpaywallText: "Download PDF (via Unpaywall)",
 
    articleLinkViaUnpaywallEnabled: true,
    articleLinkViaUnpaywallText: "Read Article (via Unpaywall)",
 
    articleAcceptedManuscriptPDFViaUnpaywallEnabled: true,
    articleAcceptedManuscriptPDFViaUnpaywallText: "Download PDF (Accepted Manuscript via Unpaywall)",
 
    articleAcceptedManuscriptArticleLinkViaUnpaywallEnabled: true,
    articleAcceptedManuscriptArticleLinkViaUnpaywallText: "Read Article (Accepted Manuscript via Unpaywall)",
  };
	
}

  
 
  browzine.script = document.createElement("script");
  browzine.script.src = "https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js";
  document.head.appendChild(browzine.script);
 
  app.controller('prmSearchResultAvailabilityLineAfterController', function($scope) {
    this.$onInit = function(){
      {
        window.browzine.primo.searchResult($scope);
      }
    };
  });
 
  app.component('prmSearchResultAvailabilityLineAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmSearchResultAvailabilityLineAfterController'
  });
  
// listen for language changes

var currentPage = window.location.href; 
var primolang = location.search.match(/lang=he/) ? 'he' : 'en';

// listen for changes 
setInterval(function () { 
var checkLang = location.search.match(/lang=he/) ? 'he' : 'en'; 
if (currentPage != window.location.href) {

//Lets check if there is a &lang in the URL 
if (window.location.href.indexOf("&lang=") > -1) { 
if (checkLang != primolang) { 
// page has changed, set new page as 'current' 
currentPage = window.location.href; 
document.location.reload(true); 
} else { 
currentPage = window.location.href; 
} 
} 
} 
}, 500);

// end listen for language changes

  
// End BrowZine - Primo Integration

// Change font color and text of "retracted journals" or "Problematic Journal" in Primo

    function changeTextColor() {
		const lang = location.search.match(/lang=he/) ? 'he' : 'en';
		console.log(lang)
		const problematic_journal_el = document.querySelectorAll('.browzine-article-link-text, .browzine-web-link-text');
		problematic_journal_el.forEach(journal => {
			if (journal.textContent.trim() === "Problematic Journal") {
                journal.style.color = '#D62100'; // Change text color to red
                journal.style.fontWeight = 'bold'; // Make text bold
				journal.textContent = lang === 'he' ? "כתב עת בעייתי לפי CABELLS" : "Problematic Journal per CABELLS";
				//journal.textContent = "Problematic Journal per CABELLS";
            }
			
		});
        
		const elements = document.querySelectorAll('.browzine-web-link-text');
        elements.forEach(element => {
            if (element.textContent.trim() === "Retracted Article") {
                element.style.color = '#D62100';
                element.style.fontWeight = 'bold';
            }
        });
    }

    // Keep the existing event listeners and observer
    document.addEventListener('DOMContentLoaded', changeTextColor);
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' || mutation.type === 'subtree') {
                changeTextColor();
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

 // Change font color of retracted journals link end
 
 // ** externalSearch facet begin **//
  app.component('prmFacetExactAfter', {
    bindings: { parentCtrl: '<' },
    template: '<external-search></external-search>'
  });

  angular.module('externalSearch', []).value('searchTargets', []).directive('externalSearch', function () {
    return {
      require: '^^prmFacet',
      restrict: 'E',
      templateUrl: 'custom/' + LOCAL_VID + '/html/externalSearch.html',
      controller: ['$scope', '$location', 'searchTargets', function ($scope, $location, searchTargets) {
        $scope.name = $scope.$ctrl.parentCtrl.facetGroup.name;
        $scope.targets = searchTargets;
        var query = $location.search().query;
        var filter = $location.search().pfilter;
        $scope.queries = Array.isArray(query) ? query : query ? [query] : false;
        $scope.filters = Array.isArray(filter) ? filter : filter ? [filter] : false;
      }],
		link: function link(scope, element, attrs, prmFacetCtrl) {
		  var facetTitleEn = 'Search also in';
		  var facetTitleHe = 'לחפש במנועי חיפוש נוספים';
		  var primolang = location.search.match(/lang=he/) ? 'he' : 'en';
		  var facetTitle = primolang === "he" ? facetTitleHe : facetTitleEn;
		  
		  // Set text direction
		  var textDirection = primolang === "he" ? 'rtl' : 'ltr';
		  element.css('direction', textDirection); // This sets the text direction for the element

		  var found = false;
		  for (var facet in prmFacetCtrl.facets) {
			if (prmFacetCtrl.facets[facet].name === facetTitle) {
			  found = true;
			}
		  }
		  if (!found) {
			prmFacetCtrl.facets.unshift({
			  name: facetTitle,
			  displayedType: 'exact',
			  limitCount: 0,
			  facetGroupCollapsed: false,
			  values: []
			});
		  }
}
    };
  });

  app.value('searchTargets', [{
	"name": "ULI",
	"nameHe": "הקטלוג המאוחד (ULI)",
    "url": "https://uli.nli.org.il/discovery/search?query=any,contains,",
    "img": "custom/" + LOCAL_VID + "/img/uli_logo_16_16.png",
    "img_2": "custom/" + LOCAL_VID + "/img/uli_logo_16_16.png",
    "alt": "ULI",
	mapping: function mapping(queries, filters) {
      try {
        var fullSearchQuery = ''; // declare the full query string var

        // for each element (query) in queries: 1. slice it after the second comma; if it ends with ",AND" or ",OR": slice it up to the last comma; append the result into fullSearchQuery (with a space after the query) 
        queries.forEach(function (e){
          var firstCommaIndex = e.indexOf(",");
          var secondCommaIndex = e.indexOf(",", firstCommaIndex + 1);
          var elSearchStr = e.slice(secondCommaIndex + 1);
          if (elSearchStr.endsWith(',AND') || elSearchStr.endsWith(',OR'))
          {
            var finalComma = elSearchStr.lastIndexOf(",");
            var elSearchStr = elSearchStr.slice(0,finalComma);
          }
          fullSearchQuery = fullSearchQuery.concat(elSearchStr + " ");
        })
        fullSearchQuery = encodeURIComponent(fullSearchQuery);
        return fullSearchQuery + "&tab=LibraryCatalog&search_scope=MyInstitution&vid=972NNL_ULI_C:MAIN&offset=0";
      } catch (e) {
        return '';
      }
    }, 
  },
  {
	"name": "Worldcat",
	"nameHe": "Worldcat",
    "url": "https://www.worldcat.org/search?qt=worldcat_org_all&q=",
    "img": "custom/" + LOCAL_VID + "/img/worldcat-16.png",
    "img_2": "custom/" + LOCAL_VID + "/img/worldcat-16.png",
    "alt": "Worldcat",
	mapping: function mapping(queries, filters) {
      try {
        var fullSearchQuery = ''; // declare the full query string var

        // for each element (query) in queries: 1. slice it after the second comma; if it ends with ",AND" or ",OR": slice it up to the last comma; append the result into fullSearchQuery (with a space after the query) 
        queries.forEach(function (e){
          var firstCommaIndex = e.indexOf(",");
          var secondCommaIndex = e.indexOf(",", firstCommaIndex + 1);
          var elSearchStr = e.slice(secondCommaIndex + 1);
          if (elSearchStr.endsWith(',AND') || elSearchStr.endsWith(',OR'))
          {
            var finalComma = elSearchStr.lastIndexOf(",");
            var elSearchStr = elSearchStr.slice(0,finalComma);
          }
          fullSearchQuery = fullSearchQuery.concat(elSearchStr + " ");
        })
        fullSearchQuery = encodeURIComponent(fullSearchQuery);
        return fullSearchQuery
      } catch (e) {
        return '';
      }
    }, 
  },
   {
    "name": "Google Scholar",
	"nameHe": "גוגל סקולר",
    "url": "https://scholar.google.com/scholar?q=",
    "img": "custom/" + LOCAL_VID + "/img/scholar_logo_16_16.png",
    "img_2": "custom/" + LOCAL_VID + "/img/scholar_logo_16_16.png",
    "alt": "Google Scholar",
    mapping: function mapping(queries, filters) {
      try {
        var fullSearchQuery = ''; // declare the full query string var

        // for each element (query) in queries: 1. slice it after the second comma; if it ends with ",AND" or ",OR": slice it up to the last comma; append the result into fullSearchQuery (with a space after the query) 
        queries.forEach(function (e){
          var firstCommaIndex = e.indexOf(",");
          var secondCommaIndex = e.indexOf(",", firstCommaIndex + 1);
          var elSearchStr = e.slice(secondCommaIndex + 1);
          if (elSearchStr.endsWith(',AND') || elSearchStr.endsWith(',OR'))
          {
            var finalComma = elSearchStr.lastIndexOf(",");
            var elSearchStr = elSearchStr.slice(0,finalComma);
          }
          fullSearchQuery = fullSearchQuery.concat(elSearchStr + " ");
        })
        fullSearchQuery = encodeURIComponent(fullSearchQuery);
        return fullSearchQuery
      } catch (e) {
        return '';
      }
    }
  }/*,
  {
    "name": "Crossref",
      "url": "https://search.crossref.org/?from_ui=yes&q=",
      "img": "custom/" + LOCAL_VID + "/img/crossred_logo_16_16.png",
      "img_2": "custom/" + LOCAL_VID + "/img/crossred_logo_16_16.png",
      "alt": "Crossref",
    mapping: function mapping(queries, filters) {
        try {
          var fullSearchQuery = ''; // declare the full query string var

          // for each element (query) in queries: 1. slice it after the second comma; if it ends with ",AND" or ",OR": slice it up to the last comma; append the result into fullSearchQuery (with a space after the query) 
          queries.forEach(function (e){
            var firstCommaIndex = e.indexOf(",");
            var secondCommaIndex = e.indexOf(",", firstCommaIndex + 1);
            var elSearchStr = e.slice(secondCommaIndex + 1);
            if (elSearchStr.endsWith(',AND') || elSearchStr.endsWith(',OR'))
            {
              var finalComma = elSearchStr.lastIndexOf(",");
              var elSearchStr = elSearchStr.slice(0,finalComma);
            }
            fullSearchQuery = fullSearchQuery.concat(elSearchStr + " ");
          })
          fullSearchQuery = encodeURIComponent(fullSearchQuery);
          return fullSearchQuery
        } catch (e) {
          return '';
        }
      }, 
    } */
  ]);

// ** externalSearch facet end **//


/** Add external links to No Results tile **/
	app.controller('prmNoSearchResultAfterController', ['angularLoad', '$location', function (angularLoad, $location) {
		var vm = this;
  		
		this.$onInit = function () {
			vm.getSearchTerm = getSearchTerm;
			function getSearchTerm() {
				return vm.parentCtrl.term;
			}
			
			if ($location.search().lang == 'he') {
				vm.link1 = "https://scholar.google.com/scholar?hl=he&q=" + encodeURIComponent(getSearchTerm());
				vm.link2 = "https://uli.nli.org.il/discovery/search?vid=972NNL_ULI_C:MAIN&query=any,contains," + encodeURIComponent(getSearchTerm());
				vm.link3 = "https://www.worldcat.org/search?qt=worldcat_org_all&q=" + encodeURIComponent(getSearchTerm());
			}
			else {
				vm.link1 = "https://scholar.google.com/scholar?hl=en&q=" + encodeURIComponent(getSearchTerm());
				vm.link2 = "https://uli.nli.org.il/discovery/search?vid=972NNL_ULI_C:MAIN&lang=en_US&query=any,contains,"  + encodeURIComponent(getSearchTerm());
				vm.link3 = "https://www.worldcat.org/search?qt=worldcat_org_all&q=" + encodeURIComponent(getSearchTerm());
			}
		};
  	}]);
	
	app.component('prmNoSearchResultAfter',{
		bindings: {parentCtrl: '<'},
		controller: 'prmNoSearchResultAfterController',
		template: '<md-card class="default-card zero-margin _md md-primoExplore-theme">'
				+ '	<md-card-content id="NoResultsExternalLinks">'
				+ '<h3><span translate="nui.aria.noresults.externalsearch.title"></span>:</h3>'
				+ '		<p><a href="{{$ctrl.link1}}" target="_blank"><img src="custom/972TAU_INST-TAU/img/scholar_logo_16_16.png" translate-attr="{ alt: \'nui.aria.noresults.externalsearch.captionLink1\' }" /> <span translate="nui.aria.noresults.externalsearch.captionLink1"></span></a></p>'
				+ '		<p><a href="{{$ctrl.link2}}" target="_blank"><img src="custom/972TAU_INST-TAU/img/uli_logo_16_16.png" translate-attr="{ alt: \'nui.aria.noresults.externalsearch.captionLink2\' }" /> <span translate="nui.aria.noresults.externalsearch.captionLink2"></span></a></p>'
				+ '		<p><a href="{{$ctrl.link3}}" target="_blank"><img src="custom/972TAU_INST-TAU/img/worldcat-16.png" translate-attr="{ alt: \'nui.aria.noresults.externalsearch.captionLink3\' }" /> <span translate="nui.aria.noresults.externalsearch.captionLink3"></span></a></p>'
				+ '	</md-card-content>'
				+ '</md-card>'
	});

/** Add external links to No Results tile end **/

// Add Clickable Logo & Change logo by Language begin
	app.controller('prmLogoAfterController', ['$location', '$http', function ($location, $http) {
		var vm = this;
		
		vm.lang = $location.search().lang;
		
		vm.getLogoImage = function () {
			if (vm.lang === 'he')
				return 'custom/972TAU_INST-TAU/img/library-logo.png';
			else
				return 'custom/972TAU_INST-TAU/img/library-logo-en.png';
				
		};
		
		vm.getLogoLink = function () {
			if (vm.lang === 'he')
				return 'https://tau-psb.primo.exlibrisgroup.com/discovery/search?vid=972TAU_INST:TAU&lang=he';
			else
				return 'https://tau-psb.primo.exlibrisgroup.com/discovery/search?vid=972TAU_INST:TAU&lang=en';
		};
	}]);


	app.component('prmLogoAfter', {
		bindings: { parentCtrl: '<' },
		controller: 'prmLogoAfterController',
		template: '\n<div class="product-logo-local product-logo" tabindex="0" role="banner" id="banner">\n<a href="{{$ctrl.getLogoLink()}}"><img class="logo-image" translate-attr="{ alt: \'nui.header.LogoAlt\' }" src="{{$ctrl.getLogoImage()}}" /></a>\n</div>\n'
	});

// Add Clickable Logo & Change logo by Language end

// Fix Hebrew quotation marks in titles - FINAL VERSION
function fixHebrewQuotationMarks() {
    console.log('Running Hebrew quotation marks fix...');
    
    const targetSpans = document.querySelectorAll('span[ng-bind-html*="highlightedText"][dir="auto"]');
    
    let fixedCount = 0;
    
    targetSpans.forEach((span, index) => {
        const ltrSpan = span.querySelector('span[dir="ltr"]');
        const rtlSpan = span.querySelector('span[dir="rtl"]');
        
        if (ltrSpan && rtlSpan) {
            const ltrText = getDirectTextContent(ltrSpan);
            const rtlText = getDirectTextContent(rtlSpan);
            
            if (isHebrewQuotePatternCorrected(ltrText, rtlText)) {
                console.log(`Found problematic Hebrew quote pattern in span ${index}, fixing...`);
                fixSpanStructure(span, ltrText, rtlText);
                fixedCount++;
            }
        }
    });
    
    if (fixedCount > 0) {
        console.log(`Fixed ${fixedCount} Hebrew quotation mark issues`);
    }
}

function getDirectTextContent(element) {
    let text = '';
    for (let node of element.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
            text += node.textContent;
        }
    }
    return text;
}

function isHebrewQuotePatternCorrected(ltrText, rtlText) {
    const ltrTrimmed = ltrText.trim();
    const rtlTrimmed = rtlText.trim();
    
    const startsWithQuote = ltrTrimmed.startsWith('"') || ltrTrimmed.startsWith('״');
    const ltrHasHebrew = /[\u0590-\u05FF]/.test(ltrText);
    const rtlHasHebrew = /[\u0590-\u05FF]/.test(rtlText);
    const rtlHasClosingQuote = rtlText.includes('"') || rtlText.includes('״');
    
    return startsWithQuote && ltrHasHebrew && rtlHasHebrew && rtlHasClosingQuote;
}

function fixSpanStructure(parentSpan, ltrText, rtlText) {
    try {
        // Clean up &nbsp; and preserve spacing
        const cleanLtrText = ltrText.replace(/&nbsp;/g, ' ');
        const cleanRtlText = rtlText.replace(/&nbsp;/g, ' ');
        
        // Combine texts with proper spacing
        // Remove extra spaces but preserve the space between words
        let combinedText = cleanLtrText + cleanRtlText;
        combinedText = combinedText.replace(/\s+/g, ' ').trim();
        
        // Create new RTL span
        const newRtlSpan = document.createElement('span');
        newRtlSpan.setAttribute('dir', 'rtl');
        newRtlSpan.textContent = combinedText;
        
        // Replace content
        parentSpan.innerHTML = '';
        parentSpan.appendChild(newRtlSpan);
        
    } catch (error) {
        console.error('Error fixing Hebrew quote structure:', error);
    }
}

// Initialize the Hebrew quotation marks fix
function initHebrewQuoteFix() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixHebrewQuotationMarks);
    } else {
        fixHebrewQuotationMarks();
    }
}

// Start the Hebrew quote fix
initHebrewQuoteFix();

// Create observer for dynamic content
const hebrewQuoteObserver = new MutationObserver((mutations) => {
    let shouldFix = false;
    
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.querySelector && 
                        (node.querySelector('span[ng-bind-html*="highlightedText"]') || 
                         node.matches('span[ng-bind-html*="highlightedText"]'))) {
                        shouldFix = true;
                    }
                }
            });
        }
    });
    
    if (shouldFix) {
        setTimeout(fixHebrewQuotationMarks, 200);
    }
});

// Start observing
hebrewQuoteObserver.observe(document.body, {
    childList: true,
    subtree: true
});

console.log('Hebrew quotation marks fix initialized');

// Hebrew quotation marks fix end


// Research Assistant component begin

app.controller('prmResearchAssistantAfterController', ['$translate', function($translate) {
    var vm = this;
    
    vm.$onInit = function() {
        console.log('=== CUSTOM.JS: Controller initialized ===');
        
        function modifyText() {
            console.log('=== CUSTOM.JS: Starting text modification ===');
            
            var assistant = document.querySelector('cdi-research-assistant');
            console.log('=== CUSTOM.JS: Found research assistant:', !!assistant);
            
            if (!assistant) {
                console.log('=== CUSTOM.JS: Research assistant not found, trying again ===');
                setTimeout(modifyText, 1000);
                return;
            }

            var shadow = assistant.shadowRoot;
            console.log('=== CUSTOM.JS: Found shadow DOM:', !!shadow);
            
            if (!shadow) {
                console.log('=== CUSTOM.JS: Shadow DOM not found, trying again ===');
                setTimeout(modifyText, 1000);
                return;
            }

            var paragraph = shadow.querySelector('p.text-xl.mt-3');
            console.log('=== CUSTOM.JS: Found paragraph:', !!paragraph);
            
            if (paragraph) {
                console.log('=== CUSTOM.JS: Found matching paragraph, modifying ===');
                
                Promise.all([
                    $translate('nui.aria.primo_research_assistant.desc.first_line'),
                    $translate('nui.aria.primo_research_assistant.desc.second_line')
                ]).then(function(translations) {
                    var styleSheet = document.createElement('style');
                    styleSheet.textContent = `
                        .primo-ra-first-part {
                            display: block;
                            margin-bottom: 1rem;
                            font-weight: bold;
                        }
                        .primo-ra-second-part {
                            display: block;
                            color: #666666;
                        }
                    `;
                    shadow.appendChild(styleSheet);
                    
                    var wrapper = document.createElement('div');
                    var firstSpan = document.createElement('span');
                    var secondSpan = document.createElement('span');
                    firstSpan.className = 'primo-ra-first-part';
                    secondSpan.className = 'primo-ra-second-part';
                    firstSpan.textContent = translations[0] + ' ';
                    secondSpan.textContent = translations[1];
                    
                    wrapper.appendChild(firstSpan);
                    wrapper.appendChild(secondSpan);
                    paragraph.innerHTML = '';
                    paragraph.appendChild(wrapper);
                    console.log('=== CUSTOM.JS: Modification completed ===');
                });
            } else {
                console.log('=== CUSTOM.JS: Target paragraph not found or content mismatch, trying again ===');
                setTimeout(modifyText, 1000);
            }
        }
        
        setTimeout(modifyText, 500);
    };
}]);

app.component('prmResearchAssistantAfter', {
    bindings: {parentCtrl: '<'},
    controller: 'prmResearchAssistantAfterController'
});

// Research Assistant component end
})();


/* StackMap: Start */
(function(){

    var a = document.querySelector("head");
    var css1 = document.createElement("link");
    css1.type = "text/css";
    css1.rel = "Stylesheet";
    css1.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
    css1.crossorigin = "anonymous";
    a.appendChild(css1);

    var css2 = document.createElement("link");
    css2.type = "text/css";
    css2.rel = "Stylesheet";
    css2.href = "https://www.stackmapintegration.com/medlibtau-primo/StackMap.min.css";
    a.appendChild(css2);

    var w = document.createElement("script");
    w.type = "text/javascript"; w.async = true;
    w.src = "https://www.stackmapintegration.com/medlibtau-primo/StackMap.min.js";
    var b = document.body;
    b.appendChild(w);

})();
/* StackMap: END */

/* google analytics integration start */
(function() {
    var googleAnalyticsUrl = document.createElement('script');
    googleAnalyticsUrl.src = "https://www.googletagmanager.com/gtag/js?id=G-SBXSXD616H";
    googleAnalyticsUrl.type = 'text/javascript';
    googleAnalyticsUrl.async = true;
    document.head.appendChild(googleAnalyticsUrl);

    var googleAnalyticsCode = document.createElement('script');
    googleAnalyticsCode.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-SBXSXD616H');
    `;
    document.head.appendChild(googleAnalyticsCode);
})();
/* google analytics integration end */

/* google tag manager start */
/* enter element to the head tag */
(function() {
    var gtmScript = document.createElement('script');
    gtmScript.async = true;
    gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-WL9FPDN5';
    gtmScript.onload = function() {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        });
    };

    var firstScript = document.getElementsByTagName('script')[0];
    if (firstScript) {
        firstScript.parentNode.insertBefore(gtmScript, firstScript);
    } else {
        var head = document.head || document.getElementsByTagName('head')[0];
        head.appendChild(gtmScript);
    }
})();

/* enter element to the body tag */
(function() {
    var noscript = document.createElement('noscript');
    var iframe = document.createElement('iframe');

    iframe.src = 'https://www.googletagmanager.com/ns.html?id=GTM-WL9FPDN5';
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';

    noscript.appendChild(iframe);

    var body = document.body;
    if(body.firstChild){
        body.insertBefore(noscript, body.firstChild);
    } else {
        body.appendChild(noscript);
    }
})();

/* google tag manager end */
