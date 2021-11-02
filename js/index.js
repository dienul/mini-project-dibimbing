function createAlert(
  title,
  summary,
  details,
  severity,
  dismissible,
  autoDismiss,
  appendToId
) {
  console.log("createAlret Done");
  var iconMap = {
    info: "fa fa-info-circle",
    success: "fa fa-thumbs-up",
    warning: "fa fa-exclamation-triangle",
    danger: "fa ffa fa-exclamation-circle",
  };

  var iconAdded = false;

  var alertClasses = ["alert", "animated", "flipInX"];
  alertClasses.push("alert-" + severity.toLowerCase());

  if (dismissible) {
    alertClasses.push("alert-dismissible");
  }

  var msgIcon = $("<i />", {
    class: iconMap[severity], // you need to quote "class" since it's a reserved keyword
  });

  var msg = $("<div />", {
    class: alertClasses.join(" "), // you need to quote "class" since it's a reserved keyword
  });

  if (title) {
    var msgTitle = $("<h4 />", {
      html: title,
    }).appendTo(msg);

    if (!iconAdded) {
      msgTitle.prepend(msgIcon);
      iconAdded = true;
    }
  }

  if (summary) {
    var msgSummary = $("<strong />", {
      html: summary,
    }).appendTo(msg);

    if (!iconAdded) {
      msgSummary.prepend(msgIcon);
      iconAdded = true;
    }
  }

  if (details) {
    var msgDetails = $("<p />", {
      html: details,
    }).appendTo(msg);

    if (!iconAdded) {
      msgDetails.prepend(msgIcon);
      iconAdded = true;
    }
  }

  if (dismissible) {
    var msgClose = $("<span />", {
      class: "close", // you need to quote "class" since it's a reserved keyword
      "data-dismiss": "alert",
      html: "<i class='fa fa-times-circle'></i>",
    }).appendTo(msg);
  }

  $("#" + appendToId).prepend(msg);

  if (autoDismiss) {
    setTimeout(function () {
      msg.addClass("flipOutX");
      setTimeout(function () {
        msg.remove();
      }, 1000);
    }, 5000);
  }
}

// setInterval(function () {
//   $("#alret-remove").remove();

//   setTimeout(function () {
//     $("#alert-test").append(`
//         <div id="alret-remove" class="alert bg-purple" role="alert">
//             A simple success alert—check it out!
//         </div>
//         `);
//   }, 2000);
// }, 3000);

// setTimeout(function () {
//   console.log("remove alert");
//   $("#alert").remove();
// }, 5000);

var ALERT_TITLE = "Oops!";
var ALERT_BUTTON_TEXT = "Ok";

if (document.getElementById) {
  window.alert = function (txt) {
    createCustomAlert(txt);
  };
}

function createCustomAlert(txt) {
  d = document;

  if (d.getElementById("modalContainer")) return;

  mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
  mObj.id = "modalContainer";
  mObj.style.height = d.documentElement.scrollHeight + "px";

  alertObj = mObj.appendChild(d.createElement("div"));
  alertObj.id = "alertBox";
  if (d.all && !window.opera)
    alertObj.style.top = document.documentElement.scrollTop + "px";
  alertObj.style.left =
    (d.documentElement.scrollWidth - alertObj.offsetWidth) / 2 + "px";
  alertObj.style.visiblity = "visible";

  h1 = alertObj.appendChild(d.createElement("h1"));
  h1.appendChild(d.createTextNode(ALERT_TITLE));

  msg = alertObj.appendChild(d.createElement("p"));
  //msg.appendChild(d.createTextNode(txt));
  msg.innerHTML = txt;

  btn = alertObj.appendChild(d.createElement("a"));
  btn.id = "closeBtn";
  btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
  btn.href = "#";
  btn.focus();
  btn.onclick = function () {
    removeCustomAlert();
    return false;
  };

  alertObj.style.display = "block";
}

function removeCustomAlert() {
  document
    .getElementsByTagName("body")[0]
    .removeChild(document.getElementById("modalContainer"));
}
