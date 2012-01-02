var badWords = ["Fuck", "Shit", "Cunt", "Bastard", "Piss", "Wank", "Bitch"];
var dinosaurs = ["Brontosaurus", "Diplodocus", "Velociraptor", "Gigantosaurus", ];

var nBadWords = badWords.length;
var nDinosaurs = dinosaurs.length;

// Given a node of type text, replace bad words with a random dinosaur. 
function censor(n) {

   var dinosaur = dinosaurs[Math.floor(Math.random()*nDinosaurs)];
   var lowerDinosaur = dinosaur.toLowerCase();
   var upperDinosaur = dinosaur.toUpperCase();
     
   for (var i=0; i < nBadWords; ++i) {

      var text1 = n.nodeValue;

      var badWord = badWords[i];
      var lowerBadWord = badWords[i].toLowerCase();
      var upperBadWord = badWords[i].toUpperCase();


      var regex = new RegExp("\\b" + badWord + "\\b", "g");
      var lowerRegex = new RegExp("\\b" + lowerBadWord + "\\b", "g");
      var upperRegex = new RegExp("\\b" + upperBadWord + "\\b", "g");

      var text2 = text1.replace(regex, dinosaur);
      var text3 = text2.replace(lowerRegex, lowerDinosaur);
      var text4 = text3.replace(upperRegex, upperDinosaur);

      if (text1 != text4) {
         chrome.extension.sendRequest({madeChange: true});
      }

      n.nodeValue = text4;
   }

}

// Given a node, run the censorasaurus on all descendents.
function execute(n) {
   $('*:not(iframe)', n)         // TODO rather than rejecting all iframes, just reject those in different domain.
        .andSelf()
        .contents()
        .each(function() {
            if (this.nodeType === 3) {
               censor(this);
            }
        });
}

function domChange(e) {
   execute(e.relatedNode);
}

$(document).ready(function() {

   execute($("body").node);
   window.addEventListener("DOMNodeInserted", domChange, true);
   
});
