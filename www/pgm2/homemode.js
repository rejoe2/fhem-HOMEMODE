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
  $("input[type=checkbox][name=HomeModeAlarmActive]").unbind().change(function() {
    var name = $(this).parent().parent().find("input:hidden").val();
    var attr = [];
    $(this).parent().parent().find("input[name=HomeModeAlarmActive]:checked").each(function() {
      attr.push($(this).val());
    });
    var as = attr.join("|");
    if (as) {
      $.post(window.location.pathname+"?cmd=attr%20"+name+"%20HomeModeAlarmActive%20"+as+"&fwcsrf="+FW_csrfToken);
    } else {
      $.post(window.location.pathname+"?cmd=deleteattr%20"+name+"%20HomeModeAlarmActive&fwcsrf="+FW_csrfToken);
    }
  });
});