// Add an event listener to the occupation select element
document.getElementById("occupation").addEventListener("change", function () {
    var occupation = this.value;
    var scholarshipSection = document.getElementById("scholarshipSection");
    var schoolarshipYes = document.getElementById("schoolarshipYes");
    var schoolarshipNo = document.getElementById("schoolarshipNo");
  
    // Show or hide the scholarship section based on the selected occupation
    if (occupation === "Student" || occupation === "PhD Student") {
      scholarshipSection.style.display = "block";
      schoolarshipYes.setAttribute("required", "true");
      schoolarshipNo.setAttribute("required", "true");
    } else {
      scholarshipSection.style.display = "none";
      schoolarshipYes.removeAttribute("required");
      schoolarshipNo.removeAttribute("required");
    }
  });
  
  // Add an event listener to the schoolarship select element
  document.getElementById("schoolarshipYes").addEventListener("change", function () {
    var motivationSection = document.getElementById("motivationSection");
    var motivation = document.getElementById("motivation");
    motivationSection.style.display = "block";
    motivation.setAttribute("required", "true");
  });
  
  // Add an event listener to the schoolarship select element
  document.getElementById("schoolarshipNo").addEventListener("change", function () {
    var motivationSection = document.getElementById("motivationSection");
    var motivation = document.getElementById("motivation");
    motivationSection.style.display = "none";
    motivation.removeAttribute("required");
  });


// Intercept form submission event
$("#form").submit(function (event) {
    event.preventDefault(); // Prevent the default form submission

    var firstName = $("#firstName").val();
    var familyName = $("#familyName").val();
    var age = $("#age").val();
    var sex = $("#sex").val();
    var email = $("#email").val();
    var mobileNumber = $("#mobileNumber").val();
    var occupation = $("#occupation").val();
    var schoolarship = $("#schoolarshipYes:checked").val() || $("#schoolarshipNo:checked").val();
    var motivation = $("#motivation").val();
    var workplace = $("#workplace").val();
    var python = $("#python").val();
    var statistics = $("#statistics").val();
    var courseNameDate = $("#courses").val();

    var courseName = courseNameDate.split('(')[0].trim();
    var courseDate = courseNameDate.split('(')[1].trim().slice(0, -1);

    // Submit values to the Google Form
    var googleFormUrl =
        "https://docs.google.com/forms/d/e/1FAIpQLSfLQmhFLSjgSGDypckXYdF8SdZxRuSocUikFtdD89g1Udv_AQ/formResponse"; // Replace with your Google Form URL

    $.ajax({
        url: googleFormUrl,
        data: {
            "entry.1635388293": firstName,
            "entry.114120062": familyName,
            "entry.476499380": age,
            "entry.356478775": sex,
            "entry.478636355": email,
            "entry.295715027": mobileNumber,
            "entry.1490514528": occupation,
            "entry.621870589": schoolarship,
            "entry.1506575047": motivation,
            "entry.1958177882": workplace,
            "entry.760456020": python,
            "entry.546093610": statistics,
            "entry.1903860283": courseName,
            "entry.636708910": courseDate,
        },
        type: "POST",
        dataType: "xml",
        statusCode: {
            0: function () {
                // Show success message and hide the form
                $("#customForm").hide();
                $("#successMessage").show();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            },
            200: function () {
                // Error message
                $("#failureMessage").show();
            },
        },
    });
});


(function () {
    "use strict";

    //Easy selector helper function
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    //Easy on scroll event listener
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    //Toggle .header-scrolled class to #header when page is scrolled
    let selectHeader = select('#header')
    if (selectHeader) {
        let header = document.getElementById('header');
        let headerLogo = document.getElementById('header-logo');
        let headerLogoImg = document.getElementById('header-logo-image');
        const headerScrolled = () => {
            if (window.scrollY > 150) {
                header.style.height = "10vh";
                header.style.backgroundColor = "rgba(0,0,0,1)";
            }
            else {
                header.style.height = "13vh";
                header.style.backgroundColor = "transparent";
            }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
    }

    //Animation on scroll
    window.addEventListener('load', () => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        })
    });
})()

//Footer year
var dateObj = new Date();
var y = dateObj.getUTCFullYear();
document.getElementById("footerYear").innerText = y;