//Start of bio
var bio = {

  "name": "HELLO, I'M GALINA",
  "role": "A web designer from New Jersey.",
  "contacts": {
    "mobile": " 111-111-1111",
    "email": " geccles01@gmail.com",
    "github": " Geccles",
    "twitter": " @GalinaEccles",
    "location": " Somerset, New Jersey",
    "street": "404 JavaScript Way"

  },
  "aboutMe": "ABOUT ME",
  "welcomeMessage": "Want to know more about me?",
  "skills": [
    "HTML", "JavaScript", "CSS", "Design Skills", "Photo Editing", "Photography"
  ],
  "bioPic": "assets/img/ProfilePicture.jpg",

  displayBio: function() {
    var name = bio.name;
    var formattedName = HTMLheaderName.replace("%data%", name);
    var role = bio.role;
    var formattedRole = HTMLheaderRole.replace("%data%", role);
    //var formattedPic = HTMLbioPic.replace("%data%", bio.bioPic);
    $("#name").append(formattedName);
    $("#name").append(formattedRole);
    //$("#header").prepend(formattedPic);

    var formattedLine = HTMLbioPic.replace("%data%", bio.bioPic);
    $(".avatar").append(formattedLine);

    var formattedaboutMe = HTMLaboutMe.replace("%data%", bio.aboutMe);
    $("#aboutMe").append(formattedaboutMe);

    var formattedwelcomeMsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
    $("#name").append(formattedwelcomeMsg);

    var formattedmobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
    $("#mobile").append(formattedmobile);

    var formattedemail = HTMLemail.replace("%data%", bio.contacts.email);
    $("#email").append(formattedemail);

    var formattedgithub = HTMLgithub.replace("%data%", bio.contacts.github);
    $("#github").append(formattedgithub);

    var formattedtwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
    $("#twitter").append(formattedtwitter);

    var formattedlocation = HTMLlocation.replace("%data%", bio.contacts.location);
    $("#myLocation").append(formattedlocation);

    var formattedstreet = HTMLstreet.replace("%data%", bio.contacts.street);
    $("#myAddress").append(formattedstreet);

    $("#myAddress").append(formattedlocation);

    $("#myAddress").append(formattedmobile);

    $("#myAddress").append(formattedemail);

  },

  displaySkill: function() {
      var formattedSkill;
      var idName;
      var skill;
      //Skills At A Glance
      if (bio.skills.length > 0) {
        $("#header").append(HTMLskillsStart);
        //My 7 Skills
        for (skill in bio.skills) {
          idName = "#skillTitle" + skill;
          formattedSkill = HTMLskills.replace("%data%", bio.skills[skill]);
          $(idName).append(formattedSkill);
        }
      }
    } //end of displaySkill function

};
bio.displayBio(); //end of displayBio function
//bio.displaySkill(); //end of displaySkill function


function displayContacts() {
  var mobile = bio.contacts.mobile;
  var formattedLine = HTMLmobile.replace("%data%", mobile);
  $("#topContacts").append(formattedLine);
  var email = bio.contacts.email;
  formattedLine = HTMLemail.replace("%data%", email);
  $("#topContacts").append(formattedLine);
  var github = bio.contacts.github;
  formattedLine = HTMLgithub.replace("%data%", github);
  $("#topContacts").append(formattedLine);
  var twitter = bio.contacts.twitter;
  formattedLine = HTMLtwitter.replace("%data%", twitter);
  $("#topContacts").append(formattedLine);
  var location = bio.contacts.location;
  formattedLine = HTMLlocation.replace("%data%", location);
  $("#topContacts").append(formattedLine);
} //end of displayContacts function

//Start of My displayEducation
var education = {
  "schools": [{
    "name": "Udacity",
    "dates": "July 2015 - Present",
    "location": "Somerset, NJ",
    "degree": "Nanodegree",
    "major": ["Front-End Web Development"]
  }, {
    "name": "Rutgers University",
    "dates": "Graduated May 2014 - summa cum laude",
    "location": "New Brunswick, NJ",
    "degree": "Bachelor of Fine Arts",
    "major": ["Photography"]
  }],

  displayEducation: function() {
    var school;
    if (education.schools.length > 0) {
      //$("#education").append(HTMLschoolStart);
      for (school in education.schools) {
        var formattedLine = HTMLschoolName.replace("%data%", education.schools[school].name);
        $("#myEducation").append(formattedLine);
        formattedLine = HTMLschoolDates.replace("%data%", education.schools[school].dates);
        $("#myEducation").append(formattedLine);
        formattedLine = HTMLschoolLocation.replace("%data%", education.schools[school].location);
        $("#myEducation").append(formattedLine);
        formattedLine = HTMLschoolDegree.replace("%data%", education.schools[school].degree);
        $("#myEducation").append(formattedLine);
        formattedLine = HTMLschoolMajor.replace("%data%", education.schools[school].major);
        $("#myEducation").append(formattedLine);
      }
    }
  }
};
education.displayEducation(); //end of ddisplayEducation function

//Start of work Experience
var work = {
  "jobs": [{
    "employer": "NJEIT",
    "title": "Web Application Developer",
    "location": "Lawrenceville, NJ",
    "dates": "September 2015 - Present",
    "description": "Collaborate with the business and technology team members to develop and design various user interfaces through frontend and backend technologies seamlessly."
  }, {
    "employer": "The Record",
    "title": "Web Designer/Administrator",
    "location": "Branchburg, NJ",
    "dates": "July 2015 - September 2015",
    "description": "Created new logo and banner for the newspaper. Maintains and update the online newspaper."
  }, {
    "employer": "Lors Photography",
    "title": "Account Manager, Photographer",
    "location": "Union, NJ",
    "dates": "January 2014 - June 2015",
    "description": "Operated as the lead point dealing with priority requests and escalations. Worked closely collaborating with the company personnel including support service and management in order to meet account goals, objectives, and customers’ expectations."
  }, {
    "employer": "Abella Studios",
    "title": "Professional Photogrpaher",
    "location": "Fairfield, NJ",
    "dates": "June 2012 - May 2014",
    "description": "Worked with clients, other photographers, and videographers in a high pressured and fast paced environment."
  }, {
    "employer": "Lors Photography",
    "title": "Intern",
    "location": "Union, NJ",
    "dates": "August 2012 - November 2012",
    "description": "Assisted in shoots for portraits, sports and special events for of high schools around New Jersey."
  }],

  displayWork: function() {
    var idName;
    var idDate;
    var idDetails;
    var idLocation;
    var formattedLine;
    var experience;
    if (work.jobs.length > 0) {
      $("#myResume").append(HTMLworkStart);
      for (experience in work.jobs) {
        idName = "#myResume" + experience;
        idDate = "#myDate" + experience;
        idDetails = "#myDetails" + experience;
        idLocation = "#myLocation" + experience;
        formattedLine = HTMLworkEmployer.replace("%data%", work.jobs[experience].employer);
        $(idName).append(formattedLine);
        formattedLine = HTMLworkTitle.replace("%data%", work.jobs[experience].title);
        $(idName).append(formattedLine);
        formattedLine = HTMLworkDates.replace("%data%", work.jobs[experience].dates);
        $(idDate).append(formattedLine);
        formattedLine = HTMLworkDescription.replace("%data%", work.jobs[experience].description);
        $(idDetails).append(formattedLine);
        formattedLine = HTMLworkLocation.replace("%data%", work.jobs[experience].location);
        $(idLocation).append(formattedLine);

      }
    }
  }
};
work.displayWork(); //ending function brace for displayWork

//start of projects
var projects = {
  "projects": [{
    "title": "About Me Project",
    "dates": "July 2015",
    "description": "My First Website",
    "images": ["assets/img/Project1.png"]
  }, {
    "title": "Project 1",
    "dates": "July 2015",
    "description": "My Portfolio Website",
    "images": ["assets/img/Project2.png"]
  }],

  displayProject: function() {
    var formattedLine;

    if (projects.projects.length > 0) {
      /* project 1 */
      formattedLine = HTMLprojectImage.replace("%data%", projects.projects[0].images[0]);
      $("#project1Figure").append(formattedLine);
      formattedLine = HTMLprojectTitle.replace("%data%", projects.projects[0].title);
      $("#project1Info").append(formattedLine);
      formattedLine = HTMLprojectDates.replace("%data%", projects.projects[0].dates);
      $("#project1Info").append(formattedLine);
      formattedLine = HTMLprojectDescription.replace("%data%", projects.projects[0].description);
      $("#project1Info").append(formattedLine);
      // project 2
      formattedLine = HTMLprojectImage.replace("%data%", projects.projects[1].images[0]);
      $("#project2Figure").append(formattedLine);
      formattedLine = HTMLprojectTitle.replace("%data%", projects.projects[1].title);
      $("#project2Info").append(formattedLine);
      formattedLine = HTMLprojectDates.replace("%data%", projects.projects[1].dates);
      $("#project2Info").append(formattedLine);
      formattedLine = HTMLprojectDescription.replace("%data%", projects.projects[1].description);
      $("#project2Info").append(formattedLine);
      /*
            $("#projects").append(HTMLprojectStart);
            for (project in projects.projects) {
              var formattedLine = HTMLprojectTitle.replace("%data%", projects.projects[project].title);
              $(".project-entry:last").append(formattedLine);
              formattedLine = HTMLprojectDates.replace("%data%", projects.projects[project].dates);
              $(".project-entry:last").append(formattedLine);
              formattedLine = HTMLprojectDescription.replace("%data%", projects.projects[project].description);
              $(".project-entry:last").append(formattedLine);
              if (projects.projects[project].images.length > 0) {
                for (image in projects.projects[project].images) {
                  formattedLine = HTMLprojectImage.replace("%data%", projects.projects[project].images[image]);
                  $(".project-entry:last").append(formattedLine);
                }
              }
            } */
    }
  }
};
projects.displayProject(); //end of displayProject function



//start of map
$("#mapDiv").append(googleMap);

//See Where Viewer Clicks on the Page
$(document).click(function(loc) {
  var x = loc.pageX;
  var y = loc.pageY;

  logClicks(x, y);
}); //end the click View
