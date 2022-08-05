import renderIcon from "../../helpers/renderIcon";
import priorityColors from "../../priorityColors";
import {Flag, FlagOutline} from "@vicons/ionicons5";

export default [
    {
        label: "Срочный",
        key: "Urgent",
        icon: () => renderIcon(Flag, priorityColors.URGENT)
    },
    {
        label: "Важный",
        key: "High",
        icon: () => renderIcon(Flag, priorityColors.HIGH)
    },
    {
        label: "Нормальный",
        key: "Normal",
        icon: () => renderIcon(Flag, priorityColors.NORMAL)
    },
    {
        label: "Низкий",
        key: "Low",
        icon: () => renderIcon(Flag, priorityColors.LOW)
    },
    {
        type: "divider",
        key: "d1",
    },
    {
        label: "Очистить",
        key: "None",
        icon: () => renderIcon(FlagOutline)
    },
]
