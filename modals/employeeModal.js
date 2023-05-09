const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
    {
        firstname: String,
        lastname: String,
        email: String,
        department : String,
        salary : Number
    },
    {
        versionKey: false,
    }
);

const EmployeeModel = mongoose.model("employee", employeeSchema);

module.exports = { EmployeeModel };

