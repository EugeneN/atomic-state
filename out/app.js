goog.provide('app');
goog.require('cljs.core');
app.items_model = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
app.add_to_items_model = (function add_to_items_model(new_item){
return cljs.core.swap_BANG_.call(null,app.items_model,(function (old_items_model){
return cljs.core.conj.call(null,old_items_model,new_item);
}));
});
app.remove_from_items_model = (function remove_from_items_model(item){
return cljs.core.swap_BANG_.call(null,app.items_model,(function (old_items_model){
return cljs.core.filter.call(null,(function (p1__2458_SHARP_){
return !(cljs.core._EQ_.call(null,item,p1__2458_SHARP_));
}),old_items_model);
}));
});
app.fire_model_changed_event = (function fire_model_changed_event(k,r,old_value,new_value){
return app.render_items.call(null,cljs.core.deref.call(null,app.items_model));
});
cljs.core.add_watch.call(null,app.items_model,"\uFDD0'items-model-watchr",app.fire_model_changed_event);
app.render_items = (function render_items(items_model_value){
return document.getElementById("items-list").innerHTML = cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,(function (p1__2459_SHARP_){
return [cljs.core.str("<li>"),cljs.core.str(p1__2459_SHARP_),cljs.core.str("<button class='remove-item' data-item-id='"),cljs.core.str(p1__2459_SHARP_),cljs.core.str("''>X</button></li>")].join('');
}),items_model_value));
});
app.add_item = (function add_item(new_item){
return app.add_to_items_model.call(null,new_item);
});
goog.exportSymbol('app.add_item', app.add_item);
app.remove_item = (function remove_item(item){
return app.remove_from_items_model.call(null,item);
});
goog.exportSymbol('app.remove_item', app.remove_item);
