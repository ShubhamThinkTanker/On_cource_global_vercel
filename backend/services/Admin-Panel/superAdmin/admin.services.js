const { commonResponse } = require("../../../helper");
const AdminModel = require("./admin.model");


exports.login = async (reqBody) => {
    try {
        let Admin = await AdminModel.findOne({
            $or: [{ email: reqBody.username }, { mobile_no: reqBody.username }]
        }).select("+password");
        if (!Admin) {
            return false;
        }
        return Admin;
    } catch (error) {
        return new Error(error);
    }
};

exports.FindAdmin = async (reqBody) => {
    try {
        const Admin = await AdminModel.findOne({
            email: reqBody.username
        });
        if (!Admin) {
            return false;
        }
        return Admin;
    } catch (error) {
        return new Error(error);
    }
};

exports.forgotpassUpdate = async (token, id) => {
    try {
        const updatetoken = await AdminModel.updateOne({ _id: id }, { resetPasswordToken: token, resetPasswordExpires: Date.now(), updated_by: id })
    } catch (error) {
        return new Error(error);
    }
};

exports.update = async (id, reqBody) => {
    try {
        let findOneBYId = await AdminModel.findOne({ _id: id });
        let updateUserData = await AdminModel.findOneAndUpdate({ _id: id }, { $set: reqBody }, { new: true, }).lean();
        if (!updateUserData) {
            return new Error(commonResponse.getErrorMessage("USER_NOT_FOUND"));
        }
        return updateUserData;
    } catch (error) {
        console.log("Error : ", error);
        return { error: error };
    }
}

exports.Valid_token = async (token) => {
    try {
        const Admin = await AdminModel.findOne({
            resetPasswordToken: token,
            ResetPasswordExpire: { $gt: Date.now() }
        });
        if (!Admin) {
            return false;
        }
        return Admin;
    } catch (error) {
        console.log("Check  Error : ", error);
        return new Error(error);
    }
};

exports.UpdatePassword = async (token, HashPassword, id) => {
    try {
        const updatetoken = await AdminModel.updateOne({
            resetPasswordToken: "",
            resetPasswordExpires: Date.now(),
            password: HashPassword,
            updated_by: id
        });
    } catch (error) {
        return new Error(error);
    }
};
