const salesModel = require("../models/salesModel.js");
const Schedule = require("../models/schedule");
const Userfe = require("../models/userfe.js");
const html_to_pdf = require("html-pdf-node");
const salesServices = require("../services/sales-pdf-service");
// Get Sales List
exports.getSalesList = function (req, res) {
  // console.log("req.query",req.query)
  try {
    const query = {};
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    const paymentMethod = req.query.paymentMethod;
    const status = req.query.status;
    const startDate = req.query.fromDate;
    const endDate = req.query.toDate;
    const options = {
      page: page,
      limit: limit,
    };
    
    //Filter by paymentMethod
    if (paymentMethod === "klarna") {
      query.paymentMethod = { $eq: paymentMethod };
    } else if (paymentMethod === "stripe") {
      query.paymentMethod = { $eq: paymentMethod };
    } else if (paymentMethod === "swish") {
      query.paymentMethod = { $eq: "swish" };
    }

    //Filter by status
    if (status === "success") {
      query.status = { $eq: status };
    } else if (status === "failed") {
      query.status = { $eq: status };
    }
    
    //Filter by date
    if (startDate !== '' && endDate !== '') {
      // console.log("date filter")
      // query.salesAt = { $gte: '2022-04-21', $lt: '2022-06-07' };
      query.salesAt = { $gte: startDate, $lt: endDate };
    }

    salesModel.paginate(query, options).then(function (result) {
      let Array = [];
      // console.log("result.docs", result.docs);

      if (result.docs.length > 0) {
        result.docs.forEach((element, index) => {
          // console.log("element", element);
          let SaleDate = element.salesAt.split("T")[0];
          let SaleTime = element.salesAt.split("T")[1];
          let hours = Number(SaleTime.match(/^(\d+)/)[1]);
          let minutes = Number(SaleTime.match(/:(\d+)/)[1]);
          let AM_PM = hours >= 12 ? "PM" : "AM";
          //  let fofo = SaleDate.split('-').join('/');
          // console.log("fofo", fofo);

          SaleTime = hours + ":" + minutes + " " + AM_PM;
          // console.log("SaleTime", SaleTime);

          Userfe.findById(element.userId).exec(function (err, doc) {
            if (err || doc === null) {
              console.log("UserNotFound");
            } else {
              // console.log("User Found" ,doc);
              Array.push({
                _id: element._id,
                transaction_Id: element.transaction_Id,
                gatewayResponse: element.gatewayResponse,
                userId: element.userId,
                userName: doc.userName,
                schedulerId: element.schedulerId,
                salesAmount: element.salesAmount,
                salesAt: element.salesAt,
                time: SaleTime,
                date: SaleDate,
                businessType: element.businessType,
                paymentMethod: element.paymentMethod,
                status: element.status,
                lawyerId: element.lawyerId,
                __v: element.__v,
              });
              // if(Array && Array!== undefined){
              //   console.log("Array",Array)
              //   Array[index].key3 = "hello";
              // }
              if (index === result.docs.length - 1) {
                // console.log("newUserList1", newUserList);
                const newResult = {
                  docs: Array,
                  total: result.total,
                  limit: result.limit,
                  page: result.page,
                  pages: result.pages,
                };
                // console.log("newResult", newResult);
                res.json(newResult);
              }
            }
          });
        });
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    console.log("error", error);

    res.status(404).json({ error: "Error in get sales list" + error });
  }
};
exports.show = function (req, res) {
  // console.log("req.params.id:"+ req.params.id);
  salesModel.findById(req.params.id).exec(function (err, doc) {
    if (err || doc === null) {
      res.status(404).json({ error: "UserNotFound" });
    } else {
      res.json(doc);
    }
  });
};
exports.generateSalesPdf = async function (req, res) {
  // console.log("req.body.sales",req.body.sales);
  const data = req.body.sales;
  // console.log("req.params.id",req.params.id);
  // finalDoc = "<p>hello world!</p>"

  // finalDoc = data.userName + " , " + data.salesAmount + " , " + data.time;
  finalDoc = await salesServices.salePdfDoc(req, res);

  // finalDoc = "<p><b> User Name :</b> " + data.userName + " </p>" + "<p><b> Price :</b> " + data.salesAmount + " </p>"

  let options = { format: "A4" };
  let file = { content: finalDoc };
  const pdfBuffer = await html_to_pdf.generatePdf(file, options);
  // console.log("file", file);
  // console.log("pdfBuffer",pdfBuffer)
  // const datu = await salesServices.salePdfDoc(req,res);
  // console.log("datu", datu);

  if (!pdfBuffer) {
    return res
      .status(404)
      .json({ err: "Err", msg: "Error while generating Agreement" });
  }

  // fs.writeFileSync('some.pdf', pdfBuffer);
  return res.status(200).json(pdfBuffer);
};
exports.getLawyerSalesList = function (req, res) {
  //   console.log("req.query", req.query.Lawyerid);
  try {
    const query = {};
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    const lawyerid = req.query.Lawyerid.replace(/\s/g, "");
    const Role = req.query.Role;
    const options = {
      page: page,
      limit: limit,
    };
    if (Role === "Advokat") {
      query.lawyerId = { $eq: lawyerid };
      // console.log('Role',Role)
      // console.log('lawyerid',lawyerid)
    } else if (Role === "Biträdande jurist") {
      query.lawyerId = { $eq: lawyerid };
    }
    salesModel.paginate(query, options).then(function (result) {
      // res.json(result);
      let Array = [];
      // console.log("result.docs", result.docs);

      if (result.docs.length > 0) {
        result.docs.forEach((element, index) => {
          // console.log("element", element);
          let SaleDate = element.salesAt.split("T")[0];
          let SaleTime = element.salesAt.split("T")[1];
          let hours = Number(SaleTime.match(/^(\d+)/)[1]);
          let minutes = Number(SaleTime.match(/:(\d+)/)[1]);
          let AM_PM = hours >= 12 ? "PM" : "AM";
          //  let fofo = SaleDate.split('-').join('/');
          // console.log("fofo", fofo);

          SaleTime = hours + ":" + minutes + " " + AM_PM;
          // console.log("SaleTime", SaleTime);

          Userfe.findById(element.userId).exec(function (err, doc) {
            if (err || doc === null) {
              console.log("UserNotFound");
            } else {
              // console.log("User Found" ,doc);
              Array.push({
                _id: element._id,
                transaction_Id: element.transaction_Id,
                gatewayResponse: element.gatewayResponse,
                userId: element.userId,
                userName: doc.userName,
                schedulerId: element.schedulerId,
                salesAmount: element.salesAmount,
                salesAt: element.salesAt,
                time: SaleTime,
                date: SaleDate,
                businessType: element.businessType,
                paymentMethod: element.paymentMethod,
                status: element.status,
                __v: element.__v,
              });
              // if(Array && Array!== undefined){
              //   console.log("Array",Array)
              //   Array[index].key3 = "hello";
              // }
              if (index === result.docs.length - 1) {
                // console.log("newUserList1", newUserList);
                const newResult = {
                  docs: Array,
                  total: result.total,
                  limit: result.limit,
                  page: result.page,
                  pages: result.pages,
                };
                // console.log("newResult", newResult);
                res.json(newResult);
              }
            }
          });
        });
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    console.log("error", error);

    res.status(404).json({ error: "Error in get sales list" + error });
  }
};
exports.getSalesByDates = function (req, res) {
  console.log("req.query", req.query);

  try {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    salesModel
      .find({ salesAt: { $gte: startDate, $lt: endDate } })
      .then(function (result) {
        res.json(result);
        // console.log('result',result)
      });
  } catch (error) {
    console.log("error", error);
    res.status(404).json({ error: "Error in get sales list by date" + error });
  }
};
