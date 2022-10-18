const StudentModel = require("../services/Student-Panel/student/student.model");
const AdminModel = require("../services/Admin-Panel/superAdmin/admin.model");

const jwt = require("jsonwebtoken");

exports.ensureAuthenticatedAdmin = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await AdminModel.findOne({ _id: decoded.id, role: "admin" });
      next();
    } catch (error) {
      return res.json({
        error: true,
        statusCode: 401,
        message: "Not authorized,token failed",
        errors: error.message,
      });
    }
  }
  if (!token) {
    return res.json({
      error: true,
      statusCode: 401,
      message: "Not authorized",
      errors: "No token",
    });
  }
};

exports.ensureAuthenticatedStudent = async (req, res, next) => {
  let token;
 
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await StudentModel.findOne({
        _id: decoded.id,
        role: "student",
      });
    
      next();
    } catch (error) {
      console.log(error,"error");
      return res.json({
        error: true,
        statusCode: 401,
        message: "Not authorized,token failed",
        errors: error.message,
      });
    }
  }
  if (!token) {
    return res.json({
      error: true,
      statusCode: 401,
      message: "Not authorized",
      errors: "No token",
    });   
    
  }
};

exports.ensureAuthenticatedBoth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role == "student") {
        req.user = await StudentModel.findOne({
          _id: decoded.id,
          role: "student",
        });
      }
      if (decoded.role == "admin") {
        req.user = await AdminModel.findOne({ _id: decoded.id, role: "admin" });
      }
      next();
    } catch (error) {
      return res.json({
        error: true,
        statusCode: 401,
        message: "Not authorized,token failed",
        errors: error.message,
      });
    }
  }
  if (!token) {
    return res.json({
      error: true,
      statusCode: 401,
      message: "Not authorized",
      errors: "No token",
    });
  }
};
