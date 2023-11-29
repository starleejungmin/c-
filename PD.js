const request = require('request');
const fs = require('fs');
const ObjectsToCsv = require('objects-to-csv');
const xlsx =require('xlsx');
const { count } = require('console');



//1. PF File 몇개인지?
var filePath = './JSFILE'
var rsData = new Array();
var rsData2 = new Array();
var rsData3 = new Array();
var rsData4 = new Array();
var rsData5 = new Array();
var rsData6 = new Array();
var rsData7 = new Array();
var rsData8 = new Array();
var rsData9 = new Array();
var rsData10 = new Array();
var rsData11 = new Array();
var rsData12 = new Array();
var rsData13 = new Array();

fs.readdir(filePath, function (err, file) {
  if (err) return console.log(err);
  if (file === null) {
    console.log("디렉토리에 파일이 없습니다.")
  }
  else {
    for (var a = 0; a < file.length; a++) {
      console.log(file[a]);
      READ_SKU(file[a]);
    }
  }
});
// 리스트만큼 SKU 읽어옴
async function READ_SKU(fileName) {
  fs.readFile(filePath + '/' + fileName, 'utf8', (error, jsonFile) => {
    if (error) return console.log(error);
    const jsonData = JSON.parse(jsonFile);

    for (var b = 0; b < jsonData.length; b++) {
      var sSKU = jsonData[b].modelCode;
      makeURL(sSKU, fileName);
    }


  });
}

// URL 만들기
function makeURL(sSKU, file) {
  var url;
  var sitecode;
  switch (file) {
    case 'test_at.json':
      url = 'https://stg3-eu-api.shop.samsung.com/tokocommercewebservices/v2/atsme/products/' + sSKU + '/**?fields=SIMPLE_INFO';
      sitecode = "at";
      break;
    case 'test_ca.json':
      url = 'https://s3-smc-api-cdn.ecom-stg.samsung.com/tokocommercewebservices/v2/casme/products/' + sSKU + '/**?fields=SIMPLE_INFO';
      sitecode = "ca";
      break;
    case 'test_ca_fr.json':
      url = 'https://s3-smc-api-cdn.ecom-stg.samsung.com/tokocommercewebservices/v2/casme/products/' + sSKU + '/**?fields=SIMPLE_INFO';
      break;
    case 'test_dk.json':
      url = 'https://stg3-eu-api.shop.samsung.com/tokocommercewebservices/v2/dksme/products/' + sSKU + '/**?fields=SIMPLE_INFO';
      sitecode = "dk";
      break;
    case 'test_es.json':
      url = 'https://stg3-eu-api.shop.samsung.com/tokocommercewebservices/v2/essme/products/' + sSKU + '/**?fields=SIMPLE_INFO';
      sitecode = "es";
      break;
    case 'test_fi.json':
      url = 'https://stg3-eu-api.shop.samsung.com/tokocommercewebservices/v2/fisme/products/' + sSKU + '/**?fields=SIMPLE_INFO';
      sitecode = "fi";
      break;
    case 'test_id.json':
      url = 'https://s3-sms-api-cdn.ecom-stg.samsung.com/tokocommercewebservices/v2/idsme/products/' + sSKU + '/**?fields=SIMPLE_INFO';
      sitecode = "id";
      break;
    case 'test_it.json':
      url = 'https://stg3-eu-api.shop.samsung.com/tokocommercewebservices/v2/itsme/products/' + sSKU + '/**?fields=SIMPLE_INFO';
      sitecode = "it";
      break;
    case 'test_my.json':
      url = 'https://s3-sms-api-cdn.ecom-stg.samsung.com/tokocommercewebservices/v2/mysme/products/' + sSKU + '/**?fields=SIMPLE_INFO';
      sitecode = "my";
      break;
    case 'test_no.json':
      url = 'https://stg3-eu-api.shop.samsung.com/tokocommercewebservices/v2/nosmb/products/' + sSKU + '/**?fields=SIMPLE_INFO';
      sitecode = "no";
      break;
    case 'test_se.json':
      url = 'https://stg3-eu-api.shop.samsung.com/tokocommercewebservices/v2/sesme/products/' + sSKU + '/**?fields=SIMPLE_INFO';
      sitecode = "se";
      break;
    case 'test_th.json':
      url = 'https://s3-sms-api-cdn.ecom-stg.samsung.com/tokocommercewebservices/v2/thsme/products/' + sSKU + '/**?fields=SIMPLE_INFO';
      sitecode = "th";
      break;
    case 'test_vn.json':
      url = 'https://s3-sms-api-cdn.ecom-stg.samsung.com/tokocommercewebservices/v2/vnsme/products/' + sSKU + '/**?fields=SIMPLE_INFO';
      sitecode = "vn";
      break;
    default:
      break;
  }
  // console.log("-----------");
  // console.log("File: "+file);
  // console.log("URL: "+url);
  // console.log("SKU: "+sSKU);
  // console.log("-----------");
  runPDAPI(url, sitecode, sSKU);
}

// API Requst Response (데이터 가공)
async function runPDAPI(url, sitecode, sSKU) {

  var cook = '__COM_SPEED=H; _cs_mk=0.5865848070381043_1650513441734; ELOQUA=GUID=E510BB4C9A504A949E627A5B9128BA2D; usi_id=vpaade_1650513446; AMCVS_35FCB57359006AE20A495EEF@AdobeOrg=1; AMCVS_231F22CE527850C40A490D4D@AdobeOrg=1; s_ecid=MCMID|09657058786617079350823444406492639659; s_cc=true; glbState=GLBdouoaz3h48i; returnURL=https://hshopfront.samsung.com/es/business/smartphones/all-smartphones/; dotcomReturnURL=https://hshopfront.samsung.com/es/business/smartphones/all-smartphones/; _ga=GA1.2.875003656.1650513448; _gid=GA1.2.1994273330.1650513448; xsdcbxyn=YGB; firstName=SMB Integration; lastName=Test; guid=4p3rqiwspg; directCallFl=N; encGuid=0x70D13DB0DC4EAC773792A8C2733746E79C989F974CFC084354A7501A10ADA1A7; mVal10=8d2f4438974e27867906e2f2ba9630e24d9f7279cdd612540f33f1a622659a6c; mVal11=; ReD=3716f094c43e9eafef29bbf4d6f3c755|b64fbc000febe42aa0ca9e5ec90fbb13|332232da102a6b79ab14796ff399be9320a634a6f35919815fc9aa9bfef7305f|eu-auth2.samsungosp.com|f13f745f372bf45feb1952d4bb5e6c48; at_check=true; directCallFlv2=Y; directCallFlAA=Y; cl=; pv=; nh=; ipv=; wl=; AMCVS_34090DB255DF7DAB7F000101@AdobeOrg=1; AMCV_34090DB255DF7DAB7F000101@AdobeOrg=-2121179033|MCMID|09657058786617079350823444406492639659|MCIDTS|19104|MCAID|NONE|MCOPTOUT-1650520955s|NONE|MCAAMLH-1651118555|11|MCAAMB-1651118555|j8Odv6LonN4r3an7LhD3WZrU1bUpAkFkkiY1ncBR96t2PTI|vVersion|5.3.0; notice_behavior=implied,eu; notice_preferences=3:; TAconsentID=bf45c8b4-3bfe-43b6-b09e-49bc15632a38; notice_gdpr_prefs=0,1,2,3::implied,eu; cmapi_gtm_bl=; cmapi_cookie_privacy=permit 1,2,3,4; _fbp=fb.1.1650513869786.870582881; cookiesAdminAccepted=true; cookieadmin-essential=true; cookieadmin-performance=false; cookieadmin-functionalityandprofiling=false; cookieadmin-adandtargeting=false; _gcl_au=1.1.140227510.1650513870; visid_incap_2563515=wcUUjK36RSiw9Ubij8dvS6PeYGIAAAAAQUIPAAAAAABt2zTFysbH1jzQu/K2fZlb; incap_ses_1570_2563515=dc3lQXqZGBHdhKsuusLJFRffYGIAAAAAu0Ch7fjbE8etgLFmgv56Ig==; _REDIRECT=false; AMCV_35FCB57359006AE20A495EEF@AdobeOrg=-2121179033|MCMID|09657058786617079350823444406492639659|MCAAMLH-1651122809|11|MCAAMB-1651122809|6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y|MCOPTOUT-1650525209s|NONE|MCAID|NONE|vVersion|5.3.0|MCIDTS|19104; cookie_country=th; ROUTE=.api-7d8d6f688c-szls7; useSMBCookiePaths=/es/;/es/;/fi/;/th/;; AMCVS_C5D8694E5994D9EB0A495E34@AdobeOrg=1; AMCV_C5D8694E5994D9EB0A495E34@AdobeOrg=-637568504|MCMID|09657058786617079350823444406492639659|MCIDTS|19104|MCAID|NONE|MCOPTOUT-1650525411s|NONE|MCAAMLH-1651123011|11|MCAAMB-1651123011|j8Odv6LonN4r3an7LhD3WZrU1bUpAkFkkiY1ncBR96t2PTI|vVersion|5.1.1; AMCV_231F22CE527850C40A490D4D@AdobeOrg=-637568504|MCIDTS|19104|MCMID|64635572492375858104428472217208647427|MCAAMLH-1651123011|11|MCAAMB-1651123011|6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y|MCOPTOUT-1650525411s|NONE|MCSYNCSOP|411-19111|vVersion|5.1.1; estoreSitecode=th; estoreSitecode_cm=sms; mbox=session#fe79f6a839244a98ac0070b8e08e0e64#1650520024|PC#fe79f6a839244a98ac0070b8e08e0e64.32_0#1713763151; jwt_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJjYXJ0R3VpZCI6IjVkNzE5NTE1LTUxNjctNDk5Yy1iNGU0LTI2ZDhlNzQ2MWMzMyIsImprdSI6Imh0dHBzOi8vczMtc21zLWFwaS1jZG4uZWNvbS1zdGcuc2Ftc3VuZy5jb20vdG9rb2NvbW1lcmNld2Vic2VydmljZXMvdjIvdGhzbWUvand0L2tleXMiLCJpc3MiOiJ0b2tvIiwiaXBBZGRyZXNzIjoiMTkyLjE2OC4wLjAiLCJ1c2VyVHlwZSI6IkN1c3RvbWVyIiwiZXhwIjoxNjUwNTIxOTU5LCJ1c2VySWQiOiI0cDNycWl3c3BnIiwiaWF0IjoxNjUwNTE4MzU5fQ.gNStvkSyjdRq1B_04EfBZevLdkFBv-ZOOcmlKG1UWyZjNxbxyvHpaqrS4qqkw4nnwO39PVFKLCK_oRFY9EnHKOwIRkkuzWlbvXBJ35WEPUTAdFWOiuG7B2wmQ7rOIaPk1bWTL5QyhcMDa-LIlsUNdEYn_H6pr3hGuHyoA453RNsVLD_cIOh5xdW3Cx7tX2tCGupIwKFCiRG8Kj0HMmfmL0nd_JsaEPqYjx5xosVcBiWnfRB-ff_EV9q_v-Gv4D9mqNilwgdEtcHbO6kSR_fPWqgZuh_5PFOihSaEw0Smjp5HSNG1P8IOpIz_uvJ5Fsc4CZRpbFf4RBH0VgnW3azCtZ0WExnGgh9Gdzu5JjwaX_MklZbNfWbsLpT8dmI1XlOHt-t7CWG1mtKAFun7xsxI_u7lRQg_BfmuGVvz9UFF_JSGL-RmvGoLSRjm1kPPZ3okry8TQ5o_hHvKa6DX1s1qq4VkqR5Jdg-NFA2eypCLo-lOPM-f9o1wfX35bRP1-X3TjqSqILU-uKqsLUS8MTrGg8N4mhafHIgxF3pMg3_lI-5_xWinpsxZIsiwWgmgL1-4vf80ehtTWP8GxeiOTYPIO1zuyERHK-LCGoZdgqFqUYXIXPukJ6c5fRGuWN9vEq5XWGfLhqX4zYOlcPqbGNzUcSbi0Tg_LlM3eDEq7seM_u0; s_ppn=th-smb:shop:business:cart; s_tp=1746; s_pv=th:business:mobile:smartphones:galaxy z:galaxy-z-fold3-f926-5g-sm-f926bzkdthl:buy; s_sq=sssamsungnexttest%2Csssamsung4mstglobaldev=%26c.%26a.%26activitymap.%26page%3Dth%253Abusiness%253Amobile%253Asmartphones%253Agalaxy%2520z%253Agalaxy-z-fold3-f926-5g-sm-f926bzkdthl%253Abuy%26link%3Dclose%26region%3Dheader%26pageIDType%3D1%26.activitymap%26.a%26.c%26pid%3Dth%253Abusiness%253Amobile%253Asmartphones%253Agalaxy%2520z%253Agalaxy-z-fold3-f926-5g-sm-f926bzkdthl%253Abuy%26pidt%3D1%26oid%3Dclose%26oidt%3D3%26ot%3DSUBMIT; s_ppvl=th%3Abusiness%3Amobile%3Asmartphones%3Afinder,77,77,3949,1238,937,1920,1080,1,P; s_ppv=th%3Abusiness%3Amobile%3Asmartphones%3Agalaxy%20z%3Agalaxy-z-fold3-f926-5g-sm-f926bzkdthl%3Abuy,56,30,1737,1238,937,1920,1080,1,P; uat-cookie=th; estoreLoginRequesting=Y';

  var headers = {
    'Cookie': cook,
    Credential: "include",
  }


  var options = {
    url: url,
    headers: headers,

  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var result = body;
      var json = JSON.parse(result);
      var temp = "";
      var temp2 = "";
      var temp3 = "";
      var temp4 = "";
      var rsJson = new Object();

      try {
        for (var g = 0; g < json.exVatTieredPrices.length; g++) {

          var c = json.exVatTieredPrices[g].formattedValue;
          temp = temp + c + "/"

          var a = json.exVatTieredPrices[g].minQuantity;
          temp2 = temp2 + a + "/"

        }
        // console.log(sitecode);
        // console.log(temp);        
      } catch (e) {

      }

      try {
        for (var t = 0; t < json.tieredPrices.length; t++) {

          var ta = json.tieredPrices[t].formattedValue;
          temp3 = temp3 + ta + "/"

          var tc = json.tieredPrices[t].minQuantity;
          temp4 = temp4 + tc + "/"

        }
      } catch (e) {

      }

      if (temp !== "" || temp2 !== "" || temp3 !== "" || temp4 !== "") {
        rsJson.Site = sitecode;
        rsJson.SKU = sSKU;
        rsJson.exVatTieredPrices_value = temp;
        rsJson.exVatTieredPrices_minQuantity = temp2;
        rsJson.TieredPrices_value = temp3;
        rsJson.TieredPrices_minQuantity = temp4;


        if (sitecode === "at") {
          rsData.push(rsJson);
        } else if (sitecode === "ca") {
          rsData2.push(rsJson);
        } else if (sitecode === "ca_fr") {
          rsData3.push(rsJson);
        } else if (sitecode === "dk") {
          rsData4.push(rsJson);
          console.log(rsData4)
        } else if (sitecode === "es") {
          rsData5.push(rsJson);
        } else if (sitecode === "fi") {
          rsData6.push(rsJson);
          console.log(rsData6)
        } else if (sitecode === "id") {
          rsData7.push(rsJson);
        } else if (sitecode === "it") {
          rsData8.push(rsJson);
        } else if (sitecode === "my") {
          rsData9.push(rsJson);
        } else if (sitecode === "no") {
          rsData10.push(rsJson);
        } else if (sitecode === "se") {
          rsData11.push(rsJson);
        } else if (sitecode === "th") {
          rsData12.push(rsJson);
        } else if (sitecode === "vn") {
          rsData13.push(rsJson);
        }




      }


      const workBook = xlsx.utils.book_new();
      const workSheet = xlsx.utils.json_to_sheet(rsData[ct]);
      xlsx.utils.book_append_sheet(workBook, workSheet);
      // xlsx.utils.book_append_sheet(workBook, workSheet, "Test");  //For Test
      xlsx.writeFile(workBook, "Result.xlsx");
      console.log("xlsx File Saved!");

      // const csv = new ObjectsToCsv(rsData4);
      //  csv.toDisk('dk.csv',{bom: true});

      // const csv2 = new ObjectsToCsv(rsData6);
      //  csv2.toDisk("fi.csv", {bom : true});

      // if (rsData !== null) {
      //   const csv = new ObjectsToCsv(rsData);
      //   csv.toDisk('at.csv');
      // } else if (rsData2 !== null) {
      //   const csv = new ObjectsToCsv(rsData2);
      //   csv.toDisk('ca.csv');
      // } else if (rsData3 !== null) {
      //   const csv = new ObjectsToCsv(rsData3);
      //   csv.toDisk('ca_fr.csv');
      // }
      // else if (rsData4 !== null) {
      //   const csv = new ObjectsToCsv(rsData4);
      //   csv.toDisk('dk.csv');
      // }
      // else if (rsData5 !== null) {
      //   const csv = new ObjectsToCsv(rsData5);
      //   csv.toDisk('es.csv');
      // }
      // else if (rsData6 !== null) {
      //   const csv = new ObjectsToCsv(rsData6);
      //   csv.toDisk('fi.csv');
      // }
      // else if (rsData7 !== null) {
      //   const csv = new ObjectsToCsv(rsData7);
      //   csv.toDisk('id.csv');
      // }
      // else if (rsData8 !== null) {
      //   const csv = new ObjectsToCsv(rsData8);
      //   csv.toDisk('it.csv');
      // }
      // else if (rsData9 !== null) {
      //   const csv = new ObjectsToCsv(rsData9);
      //   csv.toDisk('my.csv');
      // }
      // else if (rsData10 !== null) {
      //   const csv = new ObjectsToCsv(rsData10);
      //   csv.toDisk('no.csv');
      // }
      // else if (rsData11 !== null) {
      //   const csv = new ObjectsToCsv(rsData11);
      //   csv.toDisk('se.csv');
      // }
      // else if (rsData12 !== null) {
      //   const csv = new ObjectsToCsv(rsData12);
      //   csv.toDisk('th.csv');
      // }
      // else if (rsData13 !== null) {
      //   const csv = new ObjectsToCsv(rsData13);
      //   csv.toDisk('vn.csv');
      // }




    }
    else {
      console.log(`body data => ${error}`)
    }
  });
}







