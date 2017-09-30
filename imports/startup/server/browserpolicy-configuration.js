import { BrowserPolicy } from "meteor/browser-policy-common";


BrowserPolicy.content.disallowInlineScripts();
BrowserPolicy.content.disallowEval();
BrowserPolicy.framing.disallow();

BrowserPolicy.content.allowOriginForAll("https://fonts.googleapis.com");
BrowserPolicy.content.allowOriginForAll("https://fonts.gstatic.com");
