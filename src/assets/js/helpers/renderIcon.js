import {h} from "vue";
import {NIcon} from "naive-ui";

export default function (icon, color = null) {
    return h(NIcon, {color}, {
        default: () => h(icon)
    })
}
