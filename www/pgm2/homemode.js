$(document).ready(function() {
  var FW_csrfToken = $("body").attr('fwcsrf');
  $(".HOMEMODE_i").unbind().click(function() {
    var t  = $(this).find(".HOMEMODE_info").text();
    var id = $(this).find(".HOMEMODE_info").attr("informid");
    var r  = id.split("-")[1];
    $(".HOMEMODE_infopanel").text(t).attr("informid",id);
    if(r) {
      $.post(window.location.pathname+"?cmd=setreading%20$name%20lastInfo%20"+r+addcsrf(""));
    };
  });
  var checkboxes = ["HomeModeAlarmActive","HomeOpenDontTriggerModes","HomeOpenDontTriggerModesResidents"];
  checkboxes.forEach(function(a) {
    $("input[name="+a+"]").unbind().change(function() {
      var name = $(this).parent().parent().parent().find("input[name=devname]").val();
      var attr = [];
      $(this).parent().parent().find("input[name="+a+"]:checked").each(function() {
        attr.push($(this).val());
      });
      var as = attr.join("|");
      if (as != "") {
        $.post(window.location.pathname+"?cmd=attr%20"+name+"%20"+a+"%20"+as+addcsrf(""));
      } else {
        $.post(window.location.pathname+"?cmd=deleteattr%20"+name+"%20"+a+addcsrf(""));
      }
    });
  });
  $(".HOMEMODE_klapp").unbind().click(function() {
    var kt = $(this).parent().parent().find(".HOMEMODE_klapptable");
    if (kt.is(":hidden"))
    {
      kt.show();
    } else {
      kt.hide();
    }
  });
  var dropdowns = ["HomeSensorLocation","HomeContactType"];
  dropdowns.forEach(function(a) {
    $("select[name="+a+"]").unbind().change(function() {
      var name = $(this).parent().parent().parent().find("input[name=devname]").val();
      var v = $(this).val();
      $.post(window.location.pathname+"?cmd=attr%20"+name+"%20"+a+"%20"+v+addcsrf(""));
    });
  });
  var inputs = ["HomeAlarmDelay","HomeOpenMaxTrigger","HomeOpenTimeDividers","HomeOpenTimes","HomeContactReading","HomeContactValue","HomeMotionReading","HomeMotionValue","HomeTamperReading","HomeTamperValue"];
  inputs.forEach(function(a) {
    $("input[name="+a+"]").unbind().on("keypress",function(e) {
      if (e.which === 13) {
        var name = $(this).parent().parent().parent().find("input[name=devname]").val();
        var gv = $(this).parent().find("input[name="+a+"-global]").val();
        var v = $(this).val();
        if (v && v != gv) {
          if (a === "HomeAlarmDelay" && !v.match(/^\d{1,3}((\s\d{1,3}){2})?$/)) {
            FW_okDialog("<h5>Wrong value '"+v+"' for '"+a+"'!</h5><p>Must be a single number (seconds) or three space separated numbers (seconds)<br>for each alarm mode individually (armaway armhome armnight).</p>");
          } else if (a === "HomeOpenMaxTrigger" && !v.match(/^\d{1,3}$/)) {
            FW_okDialog("<h5>Wrong value '"+v+"' for '"+a+"'!</h5><p>Must be a single number for maximum numbers of open warnings.</p>");
          } else {
            $.post(window.location.pathname+"?cmd=attr%20"+name+"%20"+a+"%20"+v+addcsrf(""));
          }
        } else {
          $.post(window.location.pathname+"?cmd=deleteattr%20"+name+"%20"+a+addcsrf(""));
        }
      }
    });
  });
});
