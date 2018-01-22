$(document).ready(function() {
  var FW_csrfToken = $("body").attr('fwcsrf');
  $(".homehover").unbind().click(function() {
    var t  = $(this).find(".homeinfo").text();
    var id = $(this).find(".homeinfo").attr("informid");
    var r  = id.split("-")[1];
    $(".homeinfopanel").text(t).attr("informid",id);
    if(r) {
      $.post(window.location.pathname+"?cmd=setreading%20$name%20lastInfo%20"+r+"&fwcsrf="+FW_csrfToken);
    };
  });
  var cbs = ["HomeModeAlarmActive","HomeOpenDontTriggerModes","HomeOpenDontTriggerModesResidents"];
  cbs.forEach(function(a) {
    $("input[name="+a+"]").unbind().change(function() {
      var name = $(this).parent().parent().parent().find("input[name=devname]").val();
      var attr = [];
      $(this).parent().parent().find("input[name="+a+"]:checked").each(function() {
        attr.push($(this).val());
      });
      var as = attr.join("|");
      if (as != "") {
        $.post(window.location.pathname+"?cmd=attr%20"+name+"%20"+a+"%20"+as+"&fwcsrf="+FW_csrfToken);
      } else {
        $.post(window.location.pathname+"?cmd=deleteattr%20"+name+"%20"+a+"&fwcsrf="+FW_csrfToken);
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
});