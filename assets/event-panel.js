/**
 * The "When and where" panel beside the editor for an event: its date or "to be confirmed",
 * its start time, the line people read, and where it links when nothing is written about it.
 */
(function (wp) {
  var el = wp.element.createElement;
  var __ = wp.i18n.__;
  var C = wp.components;
  var useSelect = wp.data.useSelect;
  var useEntityProp = wp.coreData.useEntityProp;
  var Panel = (wp.editor && wp.editor.PluginDocumentSettingPanel) || (wp.editPost && wp.editPost.PluginDocumentSettingPanel);

  function WhenAndWhere() {
    var type = useSelect(function (select) { return select("core/editor").getCurrentPostType(); }, []);
    var meta = useEntityProp("postType", "afrigov_event", "meta");
    if (type !== "afrigov_event") return null;
    var values = meta[0] || {};
    var set = function (key) { return function (v) { var next = {}; next[key] = v; meta[1](Object.assign({}, values, next)); }; };
    return el(
      Panel,
      { name: "afrigov-event", title: __("When and where", "afrigov-blocks"), initialOpen: true },
      el(
        "div",
        { className: "afrigov-blocks-event-fields" },
        el(C.ToggleControl, { label: __("Date to be confirmed", "afrigov-blocks"), checked: !!values.afrigov_tbc, onChange: set("afrigov_tbc") }),
      !values.afrigov_tbc && el(C.TextControl, { type: "date", label: __("Date", "afrigov-blocks"), value: values.afrigov_date || "", onChange: set("afrigov_date") }),
      !values.afrigov_tbc && el(C.TextControl, { type: "time", label: __("Start time (optional)", "afrigov-blocks"), value: values.afrigov_time || "", onChange: set("afrigov_time") }),
      el(C.TextControl, { label: __("When and where, in words", "afrigov-blocks"), help: __("Such as: 10am to 1pm, City Hall. Shown under the title in lists.", "afrigov-blocks"), value: values.afrigov_where || "", onChange: set("afrigov_where") }),
      el(C.TextareaControl, { label: __("Sentence under the title on its page (optional)", "afrigov-blocks"), help: __("Leave empty to use the excerpt, which is also the line shown in lists.", "afrigov-blocks"), value: values.afrigov_lead || "", onChange: set("afrigov_lead") }),
      el(C.TextControl, { label: __("Links to (optional)", "afrigov-blocks"), help: __("For an event with nothing written about it here: its page elsewhere.", "afrigov-blocks"), value: values.afrigov_link || "", onChange: set("afrigov_link") })
      )
    );
  }
  wp.plugins.registerPlugin("afrigov-event-panel", { render: WhenAndWhere });
})(window.wp);
