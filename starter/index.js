const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// Write Code to gather information about the development team members, and render the HTML file.


//Check if the output folder exists and create it if it does not.
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

const team = [];

// Manager Information prompt

function managerProfile(){
    return inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: `What is your Manager's name?`
      },
      {
        type: "input",
        name: "id",
        message: `What is your Manager's ID?`
      },
      {
        type: "input",
        name: "email",
        message: `What is your Manager's email?`
      },
      {
        type: "input",
        name: "officeNumber",
        message: `What is your Manager's office number?`
      }
    ])
  }

  // Others Employees' Information prompt (Engineer, Intern)

  function teamProfile(){
    inquirer.prompt([
      {
        type: "list",
        name: "role",
        message:"Who would you like to add to your team?",
        choices: ["Engineer", "Intern", "Finish building the team"]
      }
    ]).then((data)=> {
      if (data.role === "Engineer"){
        return inquirer.prompt([
          {
            type: "input",
            name: "name",
            message: `What is your Engineer's name?`
          },
          {
            type: "input",
            name: "id",
            message: `What is your Engineer's ID?`
          },
          {
            type: "input",
            name: "email",
            message: `What is your Engineer's email?`
          },
          {
            type: "input",
            name: "github",
            message: `What is your Engineer's GitHub??`
          }
        ]).then((data)=>{
          let engineer = new Engineer(data.name, data.id, data.email,data.github);
          team.splice(team.length-1 , 0, engineer);
          teamProfile();
        })
      }
      else{
        if (data.role === "Intern"){
            return inquirer.prompt([
             {
                 type: "input",
                 name: "name",
                 message: `What is your Intern's name?`
             },
            {
                 type: "input",
                 name: "id",
                 message: `What is your Intern's ID?`
             },
             {
                 type: "input",
                 name: "email",
                 message: `What is your Intern's email?`
             },
             {
                 type: "input",
                 name: "school",
                 message: `What is your Intern's school?`
             }
        ]).then((data)=>{
          let intern = new Intern(data.name, data.id, data.email,data.school);
          team.splice(team.length-1, 0,intern);
          teamProfile();
        })
      }
    }
    return printHTML();
});
}



// Print HTML final and Save it in the output path.

function printHTML(){
    const htmlFinal = render(team);
    fs.writeFile(outputPath, htmlFinal, (err) => {
      if(err) {
        throw err;
      };
      console.log("Team Created Successfully");
    });
};

// Running node index

managerProfile()
.then((data)=>{
  const manager = new Manager(data.name, data.id, data.email, data.officeNumber);
  team.splice(team.length-1, 0, manager);
  teamProfile();
});