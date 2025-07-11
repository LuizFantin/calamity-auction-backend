const players = [
  {"auctionId":1,"name":"Sandro","battleTag":"Sandro#11257","nationality":"BR","primaryRole":"SOLO","secondaryRole":"TANK","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"ForeverSad","battleTag":"ForeverSad#1669","nationality":"BR","primaryRole":"TANK","secondaryRole":"SOLO","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"S0rtesim","battleTag":"S0rtesim","nationality":"BR","primaryRole":"HEALER","secondaryRole":"HEALER","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"Ramburu","battleTag":"FoxyBird#1197","nationality":"BR","primaryRole":"SOLO","secondaryRole":"TANK","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"SEPHIROTH","battleTag":"SEPHIROTH#13914","nationality":"BR","primaryRole":"HEALER","secondaryRole":"SOLO","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"Lean","isSubCaptain":true,"ownerUsername": "Sevh","battleTag":"Lean#12424","nationality":"AR","primaryRole":"HEALER","secondaryRole":"DPS","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"LedZepp","battleTag":"LedZepp#1318","nationality":"AR","primaryRole":"HEALER","secondaryRole":"DPS","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"Engelh","battleTag":"Engelh#1368","nationality":"PE","primaryRole":"SOLO","secondaryRole":"DPS","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"Motta","battleTag":"Motta#11510","nationality":"BR","primaryRole":"FLEX","secondaryRole":"HEALER","playWithAnotherLanguage":false},
  {"auctionId":1,"name":"Thorin","battleTag":"Thorin#12342","nationality":"CL","primaryRole":"SOLO","secondaryRole":"TANK","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"MeteorsWTF","isSubCaptain":true,"ownerUsername": "ZerGirl","battleTag":"MeteorsWTF#1143","nationality":"AR","primaryRole":"FLEX","secondaryRole":"SOLO","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"PREDATOR","isSubCaptain":true,"ownerUsername": "exorr","battleTag":"PREDATOR#12509","nationality":"BR","primaryRole":"SOLO","secondaryRole":"SOLO","playWithAnotherLanguage":false},
  {"auctionId":1,"name":"Dhrall","battleTag":"Dhrall#21585","nationality":"BR","primaryRole":"FLEX","secondaryRole":"DPS","playWithAnotherLanguage":false},
  {"auctionId":1,"name":"exorr","battleTag":"exorr#11765","nationality":"BR","primaryRole":"SOLO","secondaryRole":"FLEX","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"Rooxyz","battleTag":"Rooxyz#11401","nationality":"BR","primaryRole":"TANK","secondaryRole":"SOLO","playWithAnotherLanguage":false},
  {"auctionId":1,"name":"showker","battleTag":"Duff#12728","nationality":"BR","primaryRole":"DPS","secondaryRole":"FLEX","playWithAnotherLanguage":false},
  {"auctionId":1,"name":"DontKSmebro","battleTag":"DontKSmebro#11426","nationality":"PE","primaryRole":"HEALER","secondaryRole":"FLEX","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"T0ru","battleTag":"T0ru#1232","nationality":"PE","primaryRole":"SOLO","secondaryRole":"FLEX","playWithAnotherLanguage":false},
  {"auctionId":1,"name":"foxdarkness","battleTag":"foxdarkness#11673","nationality":"PE","primaryRole":"HEALER","secondaryRole":"DPS","playWithAnotherLanguage":false},
  {"auctionId":1,"name":"ChampofHorde","battleTag":"ChampofHorde#1678","nationality":"MX","primaryRole":"SOLO","secondaryRole":"HEALER","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"ScarletC","battleTag":"ScarletC#11247","nationality":"BR","primaryRole":"HEALER","secondaryRole":"FLEX","playWithAnotherLanguage":false},
  {"auctionId":1,"name":"Chinox","battleTag":"Chinox#11259","nationality":"UY","primaryRole":"TANK","secondaryRole":"HEALER","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"jost","battleTag":"jost#1689","nationality":"BR","primaryRole":"FLEX","secondaryRole":"HEALER","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"Althalos","battleTag":"Althalos#11633","nationality":"BR","primaryRole":"SOLO","secondaryRole":"FLEX","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"Faiser","battleTag":"Faiser#2720","nationality":"PE","primaryRole":"SOLO","secondaryRole":"FLEX","playWithAnotherLanguage":false},
  {"auctionId":1,"name":"DURAZNITO","battleTag":"DURAZNITO#11925","nationality":"GT","primaryRole":"TANK","secondaryRole":"SOLO","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"MatadorFive","battleTag":"MatadorFive#11656","nationality":"BR","primaryRole":"FLEX","secondaryRole":"HEALER","playWithAnotherLanguage":false},
  {"auctionId":1,"name":"KchoXs","battleTag":"KchoXs#2719","nationality":"AR","primaryRole":"TANK","secondaryRole":"SOLO","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"Nagato","battleTag":"Nagato#11631","nationality":"BR","primaryRole":"DPS","secondaryRole":"HEALER","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"AvenaQuaker","isSubCaptain":true,"ownerUsername": "DontKSmebro","battleTag":"AvenaQuaker#11401","nationality":"MX","primaryRole":"TANK","secondaryRole":"SOLO","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"EnigNaty","battleTag":"EnigNaty#1819","nationality":"BR","primaryRole":"DPS","secondaryRole":"TANK","playWithAnotherLanguage":false},
  {"auctionId":1,"name":"OnlyDBreeze","battleTag":"OnlyDBreeze#1932","nationality":"BR","primaryRole":"FLEX","secondaryRole":"SOLO","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"MrNewVegas","battleTag":"MrNewVegas#11307","nationality":"BR","primaryRole":"DPS","secondaryRole":"SOLO","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"SQUiRREL","battleTag":"SQUiRREL#1505","nationality":"US","primaryRole":"TANK","secondaryRole":"DPS","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"MJB","battleTag":"MJB #1626","nationality":"BR","primaryRole":"DPS","secondaryRole":"HEALER","playWithAnotherLanguage":false},
  {"auctionId":1,"name":"Moonlight","battleTag":"Moonlight#1385","nationality":"PE","primaryRole":"HEALER","secondaryRole":"HEALER","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"Fuente","battleTag":"fuente#1715","nationality":"BR","primaryRole":"FLEX","secondaryRole":"SOLO","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"deva","battleTag":"deva#1114","nationality":"PE","primaryRole":"FLEX","secondaryRole":"FLEX","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"Akashi","isSubCaptain":true,"ownerUsername": "Rooxyz","battleTag":"Akashi#23743","nationality":"BR","primaryRole":"DPS","secondaryRole":"FLEX","playWithAnotherLanguage":false},
  {"auctionId":1,"name":"Kilitao","battleTag":"Kilitao#1880","nationality":"BR","primaryRole":"TANK","secondaryRole":"HEALER","playWithAnotherLanguage":false},
  {"auctionId":1,"name":"Sroff","battleTag":"Sroff#1456","nationality":"BR","primaryRole":"DPS","secondaryRole":"TANK","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"Dovahkiin","battleTag":"Dovahkiin#11319","nationality":"BR","primaryRole":"DPS","secondaryRole":"FLEX","playWithAnotherLanguage":false},
  {"auctionId":1,"name":"Linharees","battleTag":"Linharees#21524","nationality":"BR","primaryRole":"FLEX","secondaryRole":"FLEX","playWithAnotherLanguage":false},
  {"auctionId":1,"name":"ZerGirl","battleTag":"ZerGirl#1185","nationality":"BR","primaryRole":"SOLO","secondaryRole":"DPS","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"zuiurac","battleTag":"zuiurac#1641","nationality":"BR","primaryRole":"TANK","secondaryRole":"SOLO","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"everton1459","battleTag":"Everton#1459","nationality":"BR","primaryRole":"DPS","secondaryRole":"SOLO","playWithAnotherLanguage":false},
  {"auctionId":1,"name":"KoOi","battleTag":"KoOi#1684","nationality":"BR","primaryRole":"DPS","secondaryRole":"HEALER","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"Sevh","battleTag":"Sevh#11833","nationality":"CL","primaryRole":"FLEX","secondaryRole":"DPS","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"Roger","battleTag":"WHRoger#2994","nationality":"PE","primaryRole":"DPS","secondaryRole":"FLEX","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"KohanHanin","battleTag":"KohanHanin#1278","nationality":"BR","primaryRole":"FLEX","secondaryRole":"DPS","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"Pablo","battleTag":"Pablo#11319","nationality":"BR","primaryRole":"TANK","secondaryRole":"DPS","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"Spawn","battleTag":"Spawn1221#1508","nationality":"CL","primaryRole":"DPS","secondaryRole":"HEALER","playWithAnotherLanguage":true},
  {"auctionId":1,"name":"Sunstrider","isSubCaptain":true,"ownerUsername": "Motta","battleTag":"RavenLord#12414","nationality":"BR","primaryRole":"DPS","secondaryRole":"HEALER","playWithAnotherLanguage":false},
]

module.exports = { players };