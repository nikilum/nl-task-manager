import {h} from "vue";
import {NButton, NDropdown} from "naive-ui";
import {Flag, FlagOutline} from "@vicons/ionicons5";
import colorFromPriority from '../../helpers/colorFromPriority';
import hexToRgb from "../../helpers/hexToRgb";
import renderIcon from "../../helpers/renderIcon"
import priorityDropdownOptions from '../../dropdowns/priorityDropdown/items'
import priorityDropdownActions from '../../dropdowns/priorityDropdown/actions'
import TimeDropdown from '../../../../components/TimeDropdown.vue'

export default function createColumns(data, loading, message) {
    return [
        {
            title: "Задача",
            key: "title",
            ellipsis: true,
            minWidth: '356px'
        },
        {
            title: "Приоритет",
            key: "priority",
            width: '128px',
            render: (row, index) => h(NDropdown, {
                    trigger: "click",
                    options: priorityDropdownOptions,
                    showArrow: true,
                    onSelect: (key) => priorityDropdownActions(data, row, key, loading, message)
                },
                {
                    default: () => {
                        const color = colorFromPriority(row.priority)
                        const hexColor = hexToRgb(color)

                        return h(NButton, {
                                secondary: true,
                                size: "tiny",
                                circle: true,
                                color,
                                style: color ? `background: rgba(${hexColor.r}, ${hexColor.g}, ${hexColor.b}, 0.2)` : ""
                            },
                            {
                                icon: renderIcon(color ? Flag : FlagOutline)
                            }
                        )
                    }
                }
            ),
            className: "text-align-center"
        },
        {
            title: "Оценка",
            key: "estimate",
            width: '168px',
            className: "text-align-center",
            render: (row, index) => h(TimeDropdown, {triggerTime: row.estimate, isEstimate: true, id: row.id, project_id: row.project_id})
        },
        {
            title: "Затрачено",
            key: "tracked",
            width: '168px',
            className: "text-align-center",
            render: (row, index) => h(TimeDropdown, {triggerTime: row.estimate, id: row.id, project_id: row.project_id})
        },
    ]
}
