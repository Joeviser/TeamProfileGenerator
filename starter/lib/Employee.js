// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name,id,email,role= "Employee")
    {

      // Check if 'name' is a string and is non empty
      if (typeof name !== "string" || name.trim() === "") {
        throw new Error("Input invalid! Enter a string as a name");
      }
      // Check if 'id' is a positive number (integer)
      if (!Number.isInteger(id) && id <= 0) {
        throw new Error("Input invalid! Enter a positive integer as id");
      }
      // Check if email has a correct format
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        throw new Error("Invalid e-mail format");
      }

        this.name = name;
        this.id = id;
        this.email = email;
        this.role = role;
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getRole() {
        return "Employee";
    }
}

module.exports = Employee;