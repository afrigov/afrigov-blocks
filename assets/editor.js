/**
 * Editor-wide settings that are not one block's business.
 * On pages, the embed block offers YouTube and Vimeo only, not thirty services.
 */
(function (wp) {
  var KEEP = ["youtube", "vimeo"];
  var done = false;
  function trimEmbeds() {
    if (done) return;
    var editor = wp.data.select("core/editor");
    var type = editor && editor.getCurrentPostType && editor.getCurrentPostType();
    if (!type) return;
    done = true;
    if (type !== "page") return;
    (wp.blocks.getBlockVariations("core/embed") || []).forEach(function (v) {
      if (KEEP.indexOf(v.name) === -1) wp.blocks.unregisterBlockVariation("core/embed", v.name);
    });
  }
  wp.domReady(function () {
    trimEmbeds();
    if (!done) {
      var stop = wp.data.subscribe(function () {
        trimEmbeds();
        if (done) stop();
      });
    }
  });
})(window.wp);
