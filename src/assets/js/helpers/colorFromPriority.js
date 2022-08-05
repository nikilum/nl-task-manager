import priorityColors from '@/assets/js/priorityColors'

export default function (priority) {
    switch (priority) {
        case "Urgent": return priorityColors.URGENT;
        case "High": return priorityColors.HIGH;
        case "Normal": return priorityColors.NORMAL;
        case "Low": return priorityColors.LOW;
        default: return null;
    }
}
