exports.salePdfDoc = async function (req, res) {
  // console.log("req.bpdyyyyyyyyyyyy", req.body);

  const sales = req.body.sales;
  //Capitalize Payment Method Name
  let paymentMethod = sales.paymentMethod;
  paymentMethod = paymentMethod[0].toUpperCase() + paymentMethod.substring(1);
  //   console.log("paymentMethod",paymentMethod)
  //   totalAmount = sales.salesAmount;
  //   amount = ((sales.salesAmount / 5) * 4).toFixed(2);
  //   tax = (sales.salesAmount / 5).toFixed(2);
  amount = (sales.salesAmount / 5) * 4;
  tax = sales.salesAmount / 5;
  //   console.log("amount", amount);
  //   console.log("tax", tax);
  totalAmount = sales.salesAmount;
  //Today Date
  let todayDate = new Date().toLocaleDateString().split("T")[0];
  //   let todayDate = new Date().toLocaleDateString().split("T")[0].split("/");
  //   let todayDate = date[1] + "/" + date[0] + "/" + date[2];

  //Today Time Now
  //   let time = date.split("T")[1].split(".")[0];
  //   let hours = Number(time.match(/^(\d+)/)[1]);
  //   let minutes = Number(time.match(/:(\d+)/)[1]);
  //   let AM_PM = hours >= 12 ? "PM" : "AM";
  let todayTime = new Date().toLocaleTimeString().replace(/(.*)\D\d+/, "$1");

  hrs = todayTime.split(":")[0];
  hrs = hrs < 10 ? "0" + hrs : hrs;
  //   console.log("hrs", hrs);
  todayTime = hrs + ":" + todayTime.split(":")[1];

  //   console.log("todayDate", todayDate);
  //   console.log("todayTime", todayTime);

  //   doc = sales.userName + " , " + sales.salesAmount + " , " + sales.time + "newwwwwwwwww";
  let doc =
    //Body and Netlex Logo
    "<body style='margin: 20px;'><div style='justify-content: center; display: flex;'><div style='width: 90%;'><div style='font-weight: 700; display:flex; justify-content: center; padding-left: 15px;'><svg version='1.0' xmlns='http://www.w3.org/2000/svg' width='100%'  height='98pt' viewBox='0 0 1245.000000 108.000000'><g transform='translate(0.000000,108.000000) scale(0.100000,-0.100000)' fill='#000234' stroke='none'>" +
    // "<path d='M0 540 l0 -540 6225 0 6225 0 0 540 0 540 -6225 0 -6225 0 0 -540z m4759 118 c58 -104 112 -188 119 -188 9 0 12 45 12 190 l0 190 70 0 70 0 0 -310 0 -311 -71 3 -72 3 -106 187 c-58 103 -112 188 -118 188 -10 0 -13 -44 -13 -190 l0 -190 -70 0 -70 0 0 310 0 311 72 -3 71 -3 106 -187z m831 142 l0 -50 -145 0 -145 0 0 -75 0 -75 120 0 120 0 0 -50 0 -50 -120 0 -120 0 0 -85 0 -85 145 0 145 0 0 -50 0 -50 -215 0 -215 0 0 310 0 310 215 0 215 0 0 -50z m620 0 l0 -50 -95 0 -95 0 0 -260 0 -260 -70 0 -70 0 0 260 0 260 -95 0 -95 0 0 50 0 50 260 0 260 0 0 -50z m270 -210 l0 -260 135 0 135 0 0 -50 0 -50 -205 0 -205 0 0 310 0 310 70 0 70 0 0 -260z m1137 160 c31 -66 52 -100 63 -100 10 0 31 34 62 100 l46 100 77 0 c42 0 74 -3 72 -7 -2 -5 -39 -69 -81 -144 -42 -75 -76 -145 -76 -156 0 -10 34 -79 76 -153 42 -74 79 -140 81 -147 4 -10 -13 -13 -69 -13 l-74 0 -49 100 c-31 64 -55 100 -65 100 -10 0 -34 -36 -65 -100 l-49 -100 -74 0 c-56 0 -73 3 -69 13 2 7 39 73 81 147 42 74 76 143 76 153 0 10 -29 68 -64 130 -34 62 -71 127 -80 145 l-17 32 76 0 76 0 46 -100z m-307 40 l0 -50 -215 0 -215 0 0 50 0 50 215 0 215 0 0 -50z m0 -270 l0 -50 -215 0 -215 0 0 50 0 50 215 0 215 0 0 -50z m0 -240 l0 -50 -215 0 -215 0 0 50 0 50 215 0 215 0 0 -50z'/></g></svg></div><div style='font-weight: 700; font-size: 22px;padding: 3px 10px; margin-top: 20px;'> " +
    "Betalning till" + //Paid to heading---------
    "</div><div style='color: #000000bd;font-weight: 700; display:flex; justify-content: space-between; margin: 3px 10px; margin-top: 10px; width:100%; font-size: 18px;border-bottom: 1px solid gray;'><span>" +
    "Telefon: " + //Phone: heading----------
    "</span><span>" +
    "(102) 008-078 " + //Phone number
    "</span></div><div style='color: #000000bd;font-weight: 700; display:flex; justify-content: space-between; margin: 3px 10px; margin-top: 10px; width:100%; font-size: 18px;border-bottom: 1px solid gray;'><span>" +
    "E-mail:" + //Email: heading-------------
    " </span><span>" +
    "netlex@mirlex.se" + //Email:
    "</span></div><div style='color: #000000bd;font-weight: 700; display:flex; justify-content: space-between; margin: 3px 10px; margin-top: 10px; width:100%; font-size: 18px;border-bottom: 1px solid gray;'><span>" +
    "Köpställe:" + //Website heading-------------
    " </span><a href='https://netlex.se' style='color: blue;'>" +
    "https://netlex.se" + //Website
    "</a></div><div style='font-weight: 700; font-size: 22px;padding: 3px 10px; margin-top: 20px;'>" +
    "Betalning för" + //Paid by heading--------------
    "</div><div style='color: #000000bd;font-weight: 700; display:flex; justify-content: space-between; margin: 3px 10px; margin-top: 10px; width:100%; font-size: 18px;border-bottom: 1px solid gray;'><span>" +
    "Klient namn:" + //Client Name heading--------------
    " </span><span>" +
    sales.userName + //Client Name
    "</span></div><div style='color: #000000bd;font-weight: 700; display:flex; justify-content: space-between; margin: 3px 10px; margin-top: 10px; width:100%; font-size: 18px;border-bottom: 1px solid gray;'><span>" +
    "Betalning avser:" + //Client Name heading--------------
    " </span><span>" +
    "Mötesarvoden med Netlex advokat" + //Client Name
    " </span></div><div style='color: #000000bd;font-weight: 700; display:flex; justify-content: space-between; margin: 3px 10px; margin-top: 10px; width:100%; font-size: 18px;border-bottom: 1px solid gray;'><span>" +
    "Betalningsmetod:" + //paymentMethod heading--------------
    " </span>" +
    paymentMethod + //"Klarna " + //Payment Method
    "</div><div style='color: #000000bd;font-weight: 700; display:flex; justify-content: space-between; margin: 3px 10px; margin-top: 10px; width:100%; font-size: 18px;border-bottom: 1px solid gray;'><span>" +
    "Betalningsdatum: " + //Payment Date heading--------------
    "</span>" +
    sales.date +
    " (" +
    sales.time +
    ")" + //2022-06-21 (10:12 AM) //Payment Date N Time
    "</div><div style='font-weight: 700; font-size: 22px;padding: 3px 10px; margin-top: 20px;'>" +
    "Betalt belopp" + //Amount Paid heading--------------
    "</div><div style='color: #000000bd;font-weight: 700; display:flex; justify-content: space-between; margin: 3px 10px; margin-top: 10px; width:100%; font-size: 18px;border-bottom: 1px solid gray; display:none;'><span>" +
    "Moms: " + //Price heading--------------
    "</span><span>" +
    amount +
    " Kr" + //" 115.125 Kr" + //Price
    "</span></div><div style='color: #000000bd;font-weight: 700; display:flex; justify-content: space-between; margin: 3px 10px; margin-top: 10px; width:100%; font-size: 18px;border-bottom: 1px solid gray; display:none;'><span>" +
    "Summa " + //Tax heading--------------
    "</span><span>" +
    tax +
    " Kr" + //" 38.375 Kr "+//Tax
    "</span></div><div style='color: #000000bd;font-weight: 700; display:flex; justify-content: space-between; margin: 3px 10px; margin-top: 30px; width:100%; font-size: 18px;border-bottom: 1px solid gray;'><span>" +
    "Total Summa inkl moms " + //Total Amount Paid heading--------------
    "</span>" +
    totalAmount +
    " Kr" + //"153.50 Kr " + //Total Amount Paid
    "</div><div style='color: #000000bd; display:grid; justify-content: center; margin: 3px 10px; margin-top: 80px; padding-top: 30px; width:100%;border-top: 1px solid gray;'><span style='font-size: 17px; display: flex; justify-content: center;'><span style='margin-right:10px'>" +
    "Dokument skapat kl:" + //Document created heading--------------
    "</span><span>" +
    todayDate +
    " (" +
    todayTime +
    ") " + //Document created -- "2022-06-21 (07:56 PM)"
    "</span></span><span  style=' font-size: 18px; font-weight: 700; '>" +
    "" + //Copyright
    "</span></div></div></div></body>";

  return doc;
};

exports.paymentPdfDoc = async function (req, res) {
  // console.log("req.bpdyyyyyyyyyyyy", req.body);

  const Payment = req.body.payment;
  //Capitalize Payment Method Name
  let paymentMethod = Payment.paymentMethod;
  paymentMethod = paymentMethod[0].toUpperCase() + paymentMethod.substring(1);
  //   console.log("paymentMethod",paymentMethod)
  //   totalAmount = Payment.paymentDate;
  //   amount = ((Payment.paymentDate / 5) * 4).toFixed(2);
  //   tax = (Payment.paymentDate / 5).toFixed(2);
  amount = (Payment.amount / 5) * 4;
  tax = Payment.amount / 5;
  //   console.log("amount", amount);
  //   console.log("tax", tax);
  totalAmount = Payment.amount;
  //Payment Date
  let PaymentDate = Payment.paymentDate.split("T")[0];
  let PaymentTime = Payment.paymentDate.split("T")[1];
  let hours = Number(PaymentTime.match(/^(\d+)/)[1]);
  let minutes = Number(PaymentTime.match(/:(\d+)/)[1]);
  let AM_PM = hours >= 12 ? "PM" : "AM";
  PaymentTime = hours + ":" + minutes + " " + AM_PM;
  //Today Date
  let todayDate = new Date().toLocaleDateString().split("T")[0];
  //   let todayDate = new Date().toLocaleDateString().split("T")[0].split("/");
  //   let todayDate = date[1] + "/" + date[0] + "/" + date[2];

  //Today Time Now
  //   let time = date.split("T")[1].split(".")[0];
  //   let hours = Number(time.match(/^(\d+)/)[1]);
  //   let minutes = Number(time.match(/:(\d+)/)[1]);
  //   let AM_PM = hours >= 12 ? "PM" : "AM";
  let todayTime = new Date().toLocaleTimeString().replace(/(.*)\D\d+/, "$1");

  hrs = todayTime.split(":")[0];
  hrs = hrs < 10 ? "0" + hrs : hrs;
  //   console.log("hrs", hrs);
  todayTime = hrs + ":" + todayTime.split(":")[1];

  // console.log("todayDate", todayDate);
  // console.log("todayTime", todayTime);

  //   doc = Payment.userName + " , " + Payment.paymentDate + " , " + Payment.time + "newwwwwwwwww";
  let doc =
    //Body and Netlex Logo
    "<body style='margin: 20px;'><div style='justify-content: center; display: flex;'><div style='width: 90%;'><div style='font-weight: 700; display:flex; justify-content: center; padding-left: 15px;'><svg version='1.0' xmlns='http://www.w3.org/2000/svg' width='100%'  height='98pt' viewBox='0 0 1245.000000 108.000000'><g transform='translate(0.000000,108.000000) scale(0.100000,-0.100000)' fill='#000234' stroke='none'>" +
    // "<path d='M0 540 l0 -540 6225 0 6225 0 0 540 0 540 -6225 0 -6225 0 0 -540z m4759 118 c58 -104 112 -188 119 -188 9 0 12 45 12 190 l0 190 70 0 70 0 0 -310 0 -311 -71 3 -72 3 -106 187 c-58 103 -112 188 -118 188 -10 0 -13 -44 -13 -190 l0 -190 -70 0 -70 0 0 310 0 311 72 -3 71 -3 106 -187z m831 142 l0 -50 -145 0 -145 0 0 -75 0 -75 120 0 120 0 0 -50 0 -50 -120 0 -120 0 0 -85 0 -85 145 0 145 0 0 -50 0 -50 -215 0 -215 0 0 310 0 310 215 0 215 0 0 -50z m620 0 l0 -50 -95 0 -95 0 0 -260 0 -260 -70 0 -70 0 0 260 0 260 -95 0 -95 0 0 50 0 50 260 0 260 0 0 -50z m270 -210 l0 -260 135 0 135 0 0 -50 0 -50 -205 0 -205 0 0 310 0 310 70 0 70 0 0 -260z m1137 160 c31 -66 52 -100 63 -100 10 0 31 34 62 100 l46 100 77 0 c42 0 74 -3 72 -7 -2 -5 -39 -69 -81 -144 -42 -75 -76 -145 -76 -156 0 -10 34 -79 76 -153 42 -74 79 -140 81 -147 4 -10 -13 -13 -69 -13 l-74 0 -49 100 c-31 64 -55 100 -65 100 -10 0 -34 -36 -65 -100 l-49 -100 -74 0 c-56 0 -73 3 -69 13 2 7 39 73 81 147 42 74 76 143 76 153 0 10 -29 68 -64 130 -34 62 -71 127 -80 145 l-17 32 76 0 76 0 46 -100z m-307 40 l0 -50 -215 0 -215 0 0 50 0 50 215 0 215 0 0 -50z m0 -270 l0 -50 -215 0 -215 0 0 50 0 50 215 0 215 0 0 -50z m0 -240 l0 -50 -215 0 -215 0 0 50 0 50 215 0 215 0 0 -50z'/></g></svg></div><div style='font-weight: 700; font-size: 22px;padding: 3px 10px; margin-top: 20px;'> " +
    "Betalning till " + //Paid to heading---------
    "</div><div style='color: #000000bd;font-weight: 700; display:flex; justify-content: space-between; margin: 3px 10px; margin-top: 10px; width:100%; font-size: 18px;border-bottom: 1px solid gray;'><span>" +
    "Telefon: " + //Phone: heading----------
    "</span><span>" +
    "(102) 008-078" + //Phone number
    "</span></div><div style='color: #000000bd;font-weight: 700; display:flex; justify-content: space-between; margin: 3px 10px; margin-top: 10px; width:100%; font-size: 18px;border-bottom: 1px solid gray;'><span>" +
    "E-mail:" + //Email: heading-------------
    " </span><span>" +
    "netlex@mirlex.se" + //Email:
    "</span></div><div style='color: #000000bd;font-weight: 700; display:flex; justify-content: space-between; margin: 3px 10px; margin-top: 10px; width:100%; font-size: 18px;border-bottom: 1px solid gray;'><span>" +
    "Köpställe:" + //Website heading-------------
    " </span><a href='https://netlex.se' style='color: blue;'>" +
    "https://netlex.se" + //Website
    "</a></div><div style='font-weight: 700; font-size: 22px;padding: 3px 10px; margin-top: 20px;'>" +
    "Betalning för " + //Paid by heading--------------
    "</div><div style='color: #000000bd;font-weight: 700; display:flex; justify-content: space-between; margin: 3px 10px; margin-top: 10px; width:100%; font-size: 18px;border-bottom: 1px solid gray;'><span>" +
    "Klient namn:" + //Client Name heading--------------
    " </span><span>" +
    Payment.userName + //Client Name
    "</span></div><div style='color: #000000bd;font-weight: 700; display:flex; justify-content: space-between; margin: 3px 10px; margin-top: 10px; width:100%; font-size: 18px;border-bottom: 1px solid gray;'><span>" +
    "Betalning avser:" + //Paid for heading--------------
    " </span><span>" +
    "Köpeavtal" + //Paid for
    " </span></div><div style='color: #000000bd;font-weight: 700; display:flex; justify-content: space-between; margin: 3px 10px; margin-top: 10px; width:100%; font-size: 18px;border-bottom: 1px solid gray;'><span>" +
    "Betalningsmetod: " + //paymentMethod heading--------------
    " </span>" +
    paymentMethod + //"Klarna " + //Payment Method
    "</div><div style='color: #000000bd;font-weight: 700; display:flex; justify-content: space-between; margin: 3px 10px; margin-top: 10px; width:100%; font-size: 18px;border-bottom: 1px solid gray;'><span>" +
    "Betalningsdatum: " + //Payment Date heading--------------
    "</span>" +
    PaymentDate +
    " (" +
    PaymentTime +
    ")" + //2022-06-21 (10:12 AM) //Payment Date N Time
    "</div><div style='font-weight: 700; font-size: 22px;padding: 3px 10px; margin-top: 20px;'>" +
    "Betalt belopp" + //Amount Paid heading--------------
    "</div><div style='color: #000000bd;font-weight: 700; display:flex; justify-content: space-between; margin: 3px 10px; margin-top: 10px; width:100%; font-size: 18px;border-bottom: 1px solid gray;'><span>" +
    "Pris: " + //Price heading--------------
    "</span><span>" +
    amount +
    " Kr" + //" 115.125 Kr" + //Price
    "</span></div><div style='color: #000000bd;font-weight: 700; display:flex; justify-content: space-between; margin: 3px 10px; margin-top: 10px; width:100%; font-size: 18px;border-bottom: 1px solid gray;'><span>" +
    "Summa " + //Tax heading--------------
    "</span><span>" +
    tax +
    " Kr" + //" 38.375 Kr "+//Tax
    "</span></div><div style='color: #000000bd;font-weight: 700; display:flex; justify-content: space-between; margin: 3px 10px; margin-top: 30px; width:100%; font-size: 18px;border-bottom: 1px solid gray;'><span>" +
    "Total Summa inkl moms" + //Total Amount Paid heading--------------
    "</span>" +
    totalAmount +
    " Kr" + //"153.50 Kr " + //Total Amount Paid
    "</div><div style='color: #000000bd; display:grid; justify-content: center; margin: 3px 10px; margin-top: 80px; padding-top: 30px; width:100%;border-top: 1px solid gray;'><span style='font-size: 17px; display: flex; justify-content: center;'><span style='margin-right:10px'>" +
    "Dokument skapat kl" + //Document created heading--------------
    "</span><span>" +
    todayDate +
    " (" +
    todayTime +
    ") " + //Document created -- "2022-06-21 (07:56 PM)"
    "</span></span><span  style=' font-size: 18px; font-weight: 700; '>" +
    "" + //Copyright
    "</span></div></div></div></body>";

  return doc;
};
