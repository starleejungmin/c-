lconst xlsx = require('xlsx')
const Excel = require('exceljs')
const request = require('request');
const fs = require('fs');

var filePath = './JSFILE'
var wb = new Excel.Workbook();
var path = require('path');
var filepath = path.resolve(__dirname, '0421_exclude.xlsx');
var sitecode = [ "at", "ca", "ca_fr", "dk", "es", "fi", "id", "it", "my", "no", "se", "th", "vn" ];
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


wb.xlsx.readFile(filepath).then(function () {

    var sh;
    for (var a = 0; a < sitecode.length; a++) {

        sh = wb.getWorksheet(sitecode[a]);

        var sSKU;
        var sheetRowCount;

        try{
            sheetRowCount = sh.actualRowCount;
        }catch(e){
            continue;
        }
        // sh.actualRowCount
        for (var i = 3; i <= sheetRowCount; i++) {
            sSKU = sh.getCell(i, 3).text;
            var url = "";
            var site1 = "";

            if (sh.name === 'at') {
                url = 'https://stg3-eu-api.shop.samsung.com/tokocommercewebservices/v2/atsme/products/' + sSKU + '/**?fields=SIMPLE_INFO';
                site1 = "at"
            } else if (sh.name === 'ca') {
                url = 'https://s3-smc-api-cdn.ecom-stg.samsung.com/tokocommercewebservices/v2/casme/products/' + sSKU + '/**?fields=SIMPLE_INFO';
                site1 = "ca"
            } else if (sh.name === 'ca_fr') {
                url = 'https://s3-smc-api-cdn.ecom-stg.samsung.com/tokocommercewebservices/v2/casme/products/' + sSKU + '/**?fields=SIMPLE_INFO';
                site1 ="ca_fr"
            } else if (sh.name === 'dk') {
                url = 'https://stg3-eu-api.shop.samsung.com/tokocommercewebservices/v2/dksme/products/' + sSKU + '/**?fields=SIMPLE_INFO';
                site1 ="dk"
            } else if (sh.name === 'es') {
                url = 'https://stg3-eu-api.shop.samsung.com/tokocommercewebservices/v2/essme/products/' + sSKU + '/**?fields=SIMPLE_INFO';
                site1 ="es"
            } else if (sh.name === 'fi') {
                url = 'https://stg3-eu-api.shop.samsung.com/tokocommercewebservices/v2/fisme/products/' + sSKU + '/**?fields=SIMPLE_INFO';
                site1 = "fi"
            } else if (sh.name === 'id') {
                url = 'https://s3-sms-api-cdn.ecom-stg.samsung.com/tokocommercewebservices/v2/idsme/products/' + sSKU + '/**?fields=SIMPLE_INFO';
                site1 ="id"
            } else if (sh.name === 'it') {
                url = 'https://stg3-eu-api.shop.samsung.com/tokocommercewebservices/v2/itsme/products/' + sSKU + '/**?fields=SIMPLE_INFO';
                site1 ="it"
            } else if (sh.name === 'my') {
                url = 'https://s3-sms-api-cdn.ecom-stg.samsung.com/tokocommercewebservices/v2/mysme/products/' + sSKU + '/**?fields=SIMPLE_INFO';
                site1 ="my"
            } else if (sh.name === 'no') {
                url = 'https://stg3-eu-api.shop.samsung.com/tokocommercewebservices/v2/nosmb/products/' + sSKU + '/**?fields=SIMPLE_INFO';
                site1 ="no"
            } else if (sh.name === 'se') {
                url = 'https://stg3-eu-api.shop.samsung.com/tokocommercewebservices/v2/sesme/products/' + sSKU + '/**?fields=SIMPLE_INFO';
                site1 ="se"
            } else if (sh.name === 'th') {
                url = 'https://s3-sms-api-cdn.ecom-stg.samsung.com/tokocommercewebservices/v2/thsme/products/' + sSKU + '/**?fields=SIMPLE_INFO';
                site1 ="th"
            } else if (sh.name === 'vn') {
                url = 'https://s3-sms-api-cdn.ecom-stg.samsung.com/tokocommercewebservices/v2/vnsme/products/' + sSKU + '/**?fields=SIMPLE_INFO';
                site1 ="vn"
            }else{
                continue;
            }

            runPDAPI(url, site1, sSKU)

        }

    }

})

function runPDAPI(url, sitecode, sSKU) {

    var cook = 'uat-cookie=ca; _REDIRECT=false; at_check=true; _scid=caf4cace-17e0-4f1d-bac2-86ebf32b7103; AMCVS_63D8A7AF58497DED0A495DE6@AdobeOrg=1; __COM_SPEED=H; _gcl_au=1.1.636176543.1650719096; s_ecid=MCMID|35973804430963491931153386678179261322; sgd-marketing-channel=Direct; sgd-entry-page=/ca/business/smartphones/all-smartphones/; AMCV_63D8A7AF58497DED0A495DE6@AdobeOrg=-1124106680|MCIDTS|19106|MCMID|35973804430963491931153386678179261322|MCAAMLH-1651323896|11|MCAAMB-1651323896|RKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y|MCCIDH|-779783578|MCOPTOUT-1650726296s|NONE|MCAID|NONE|vVersion|5.2.0; AMCVS_231F22CE527850C40A490D4D@AdobeOrg=1; s_cc=true; _sctr=1|1650639600000; _fbp=fb.1.1650719096721.836510243; _cs_c=1; spr-chat-token-60a3afe9f89b5661a7ef762d_app_940146=; _cs_id=5ee368e0-a594-a797-db01-83937a90c40e.1650719096.1.1650719130.1650719096.1.1684883096792; _cs_s=2.0.0.1650720930078; wl=; ipv=; pv=; nh=; cl=; cookie_country=fi; ELOQUA=GUID=57CDC262C9554749BDC392DEDE5F8BEF; visid_incap_2563515=PY7RLk5cSBi432nlG737Ntr5Y2IAAAAAQUIPAAAAAAAXzrrT4UBoY1qo5wmy+HFW; incap_ses_1592_2563515=NYL8RjAUKn2yjiRZnOsXFtr5Y2IAAAAA9aEY7UkXkQjOx5LpkonbAg==; returnURL=https://hshopfront.samsung.com/fi/business/smartphones/all-smartphones/; dotcomReturnURL=https://hshopfront.samsung.com/fi/business/smartphones/all-smartphones/; glbState=GLBw4s9r5ts2b; _ga=GA1.2.1609425202.1650719284; _gid=GA1.2.888292745.1650719284; xsdcbxyn=YGB; firstName=SMB; lastName=INTEGRATION; guid=hy0jqtmr2h; directCallFl=N; encGuid=0x98BC2DF892D6EE5BED6859D180D243F3D8A2B0BC1FEB50F10676E113F467F005; mVal10=676013a3283ff4952e799ec61bb43fd56b4ae68fcfa3151be0badd8ab7d42b01; mVal11=; ReD=b4642a65dc94c374cfb36ec58ccc78e7|f7d9af42719c94ce3894e791eca6e748|332232da102a6b79ab14796ff399be9320a634a6f35919815fc9aa9bfef7305f|eu-auth2.samsungosp.com|f1893b02ef362564ad9b911d213112b8; estoreSitecode=fi; estoreSitecode_cm=eu; jwt_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJjYXJ0R3VpZCI6IjI1ZjVmZTFkLWU4ODktNDU2MS1hYWU5LWRhZjQ5MDllYTA0NCIsImprdSI6Imh0dHBzOi8vc3RnMy5zaG9wLnNhbXN1bmcuY29tL3Rva29jb21tZXJjZXdlYnNlcnZpY2VzL3YyL2Zpc21lL2p3dC9rZXlzIiwiaXNzIjoidG9rbyIsImlwQWRkcmVzcyI6IjE5Mi4xNjguMC4wIiwidXNlclR5cGUiOiJDdXN0b21lciIsImV4cCI6MTY1MDcyMjk1OSwidXNlcklkIjoiaHkwanF0bXIyaCIsImlhdCI6MTY1MDcxOTM1OX0.Ad11P5Md40IXYBcX6tuYeYG21Qkpd3KKHQ4h7K2tXVfIK4ikSLgnEpWD1PA0fm9yiCQNL2j6F1XvtlwLp8pe2jLQiaq4kjoLhw88a0cooS6j1MjiEiD5tF9af8eOqX_mUnic96iLoyGzFjEaxma6wYLqPqxQUwWtnDArgPUlVeqbTesqTI7Za60XaT4503gNkrPcMjdT6vg_rAXiFN6R9qcC8IaQWkR-YZCjCRpYLbCsJOF4dJsbPf7VobcPKu5mNOs_I_2VYCEHXM5NvLC2V5gsbIT5TOC5StTpjCR6jgZU9y_A2OwiIgdWHAv6Lb3JHhokQFhP1ii8Jugw3t0We3fRm9DcHBgkp_woszYd_OB46BFzC9F0ZLP0SXIUaWC7ppIzyWNdsfeQYJFh0IJwFjitjttY4u2QEdnANbviNf6HpZbFYEDLD17jiqAAshSlLcu3uXqlVVsIredxx4ciPrGrwcWyHRVKknXmI7axzn-dxobOlnzwpSFpc2ZrbJ8t660DWbgfelGq97Lo6PoL5czUX687GzwlGI07hjy7uZifhj3l9f8xqhuZh8RiyDWU1V_xSkMKVjG7zK4Fl_FGmvlkdgWAtYMfP85LqAwCsY8KUq5sPMvVM4NdeREDztPJjma5yV9_tHnAiOkTays4eb3fgEjpPHPe5nlHxhux4Gw; directCallFlv2=Y; ROUTE=.api-7b9578d558-gjm84; useSMBCookiePaths=/fi/;; directCallFlAA=Y; AMCVS_34090DB255DF7DAB7F000101@AdobeOrg=1; AMCV_34090DB255DF7DAB7F000101@AdobeOrg=-2121179033|MCMID|35973804430963491931153386678179261322|MCIDTS|19106|MCAAMLH-1651324155|11|MCAAMB-1651324155|j8Odv6LonN4r3an7LhD3WZrU1bUpAkFkkiY1ncBR96t2PTI|MCOPTOUT-1650726555s|NONE|MCAID|NONE|vVersion|5.3.0; AMCV_231F22CE527850C40A490D4D@AdobeOrg=-2121179033|MCMID|35973804430963491931153386678179261322|MCIDTS|19106|MCAAMLH-1651324155|11|MCAAMB-1651324155|j8Odv6LonN4r3an7LhD3WZrU1bUpAkFkkiY1ncBR96t2PTI|MCOPTOUT-1650726555s|NONE|MCSYNCSOP|411-19113|vVersion|5.3.0; s_pv=fi:business:mobile:smartphones:galaxy s:galaxy-s21-fe-5g-olive-128gb-sm-g990blgdeub:simple; s_ppvl=fi%3Abusiness%3Amobile%3Asmartphones%3Agalaxy%20s%3Agalaxy-s21-fe-5g-olive-128gb-sm-g990blgdeub%3Asimple,21,21,1079,1132,1079,1440,960,1.5,P; s_ppv=fi%3Abusiness%3Amobile%3Asmartphones%3Agalaxy%20s%3Agalaxy-s21-fe-5g-olive-128gb-sm-g990blgdeub%3Asimple,11,11,1079,1132,1079,1440,960,1.5,P; s_sq=sssamsungnexttest%2Csssamsung4mstglobaldev=%26c.%26a.%26activitymap.%26page%3Dfi%253Abusiness%253Amobile%253Asmartphones%253Agalaxy%2520s%253Agalaxy-s21-fe-5g-olive-128gb-sm-g990blgdeub%253Asimple%26link%3DOsta%2520nyt%26region%3DanchorContainer%26pageIDType%3D1%26.activitymap%26.a%26.c%26pid%3Dfi%253Abusiness%253Amobile%253Asmartphones%253Agalaxy%2520s%253Agalaxy-s21-fe-5g-olive-128gb-sm-g990blgdeub%253Asimple%26pidt%3D1%26oid%3Dhttps%253A%252F%252Fhshopfront.samsung.com%252Ffi%252Fbusiness%252Fsmartphones%252Fgalaxy-s%252Fgalaxy-s21-fe-5g-olive-128gb-sm-g990%26ot%3DA; mbox=session#78fb619ee61444baa1ca028c5089a4e6#1650721238|PC#78fb619ee61444baa1ca028c5089a4e6.32_0#1713964168';

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
            var json = JSON.parse(body);
            var temp = "";
            var temp2 = "";
            var temp3 = "";
            var temp4 = "";
            var rsJson = new Object();

             console.log("--------------"+ sitecode +"--------------"+url)

            try {
                for (var g = 0; g < json.exVatTieredPrices.length; g++) {

                    var c = json.exVatTieredPrices[g].formattedValue;
                    temp = temp + c + "/"

                    var a = json.exVatTieredPrices[g].minQuantity;
                    temp2 = temp2 + a + "/"

                }      
            } catch {
            }

            try {
                for (var t = 0; t < json.tieredPrices.length; t++) {

                    var ta = json.tieredPrices[t].formattedValue;
                    temp3 = temp3 + ta + "/"

                    var tc = json.tieredPrices[t].minQuantity;
                    temp4 = temp4 + tc + "/"

                }
            } catch {
            }

            //rsJson.Site = sitecode;
            rsJson.SKU = sSKU;
            rsJson.exVatTieredPrices_value = temp;
            rsJson.exVatTieredPrices_minQuantity = temp2;
            rsJson.TieredPrices_value = temp3;
            rsJson.TieredPrices_minQuantity = temp4;
            
            

            if (sitecode === "at") {
                rsData.push(rsJson);
                const test = JSON.stringify(rsData);
                fs.writeFileSync('./RESULT/PD_API_at.json', test);
            } else if (sitecode === "ca") {
                rsData2.push(rsJson);
                const test = JSON.stringify(rsData2);
                fs.writeFileSync('./RESULT/PD_API_ca.json', test);
            } else if (sitecode === "ca_fr") {
                rsData3.push(rsJson);
                const test = JSON.stringify(rsData3);
                fs.writeFileSync('./RESULT/PD_API_ca_fr.json', test);
            } else if (sitecode === "dk") {
                rsData4.push(rsJson);
                const test = JSON.stringify(rsData4);
                fs.writeFileSync('./RESULT/PD_API_dk.json', test);
            } else if (sitecode === "es") {
                rsData5.push(rsJson);
                const test = JSON.stringify(rsData5);
                fs.writeFileSync('./RESULT/PD_API_es.json', test);
            } else if (sitecode === "fi") {
                rsData6.push(rsJson);
                const test = JSON.stringify(rsData6);
                fs.writeFileSync('./RESULT/PD_API_fi.json', test);
            } else if (sitecode === "id") {
                rsData7.push(rsJson);
                const test = JSON.stringify(rsData7);
                fs.writeFileSync('./RESULT/PD_API_id.json', test);
            } else if (sitecode === "it") {
                rsData8.push(rsJson);
                const test = JSON.stringify(rsData8);
                fs.writeFileSync('./RESULT/PD_API_it.json', test);
            } else if (sitecode === "my") {
                rsData9.push(rsJson);
                const test = JSON.stringify(rsData9);
                fs.writeFileSync('./RESULT/PD_API_my.json', test);
            } else if (sitecode === "no") {
                rsData10.push(rsJson);
                const test = JSON.stringify(rsData10);
                fs.writeFileSync('./RESULT/PD_API_no.json', test);
            } else if (sitecode === "se") {
                rsData11.push(rsJson);
                const test = JSON.stringify(rsData11);
                fs.writeFileSync('./RESULT/PD_API_se.json', test);
            } else if (sitecode === "th") {
                rsData12.push(rsJson);
                const test = JSON.stringify(rsData12);
                fs.writeFileSync('./RESULT/PD_API_th.json', test);
            } else if (sitecode === "vn") {
                rsData13.push(rsJson);
                const test = JSON.stringify(rsData13);
                fs.writeFileSync('./RESULT/PD_API_vn.json', test);
            }


        }
        else {
            console.log(`body data => ${error}`)
        }

    });
}



