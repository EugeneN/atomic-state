(ns app)

;; bl layer
(def items-model (atom []))

(defn add-to-items-model [new-item]
  (swap! items-model (fn [old-items-model] (conj old-items-model new-item))))

(defn remove-from-items-model [item]
  (swap! items-model (fn [old-items-model] (filter #(not (= item %1)) old-items-model))))

(defn fire-model-changed-event [k, r, old-value, new-value] (render-items @items-model))

(add-watch items-model :items-model-watchr fire-model-changed-event)


;; protocol
(defn render-items [items-model-value]
  ;; this should just return a rendered view
  (set! (.-innerHTML (.getElementById js/document "items-list"))
        (apply str (map #(str "<li>" %1 "<button class='remove-item' data-item-id='" %1 "''>X</button></li>") items-model-value))))

(defn ^:export add-item [new-item] (add-to-items-model new-item))

(defn ^:export remove-item [item] (remove-from-items-model item))


