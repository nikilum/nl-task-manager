export default function(time) {
    const slicedTime = time.split(' ')

    return slicedTime.map((item) => {
        let formattedItem = item

        if (item.indexOf('д') !== -1) {
            formattedItem = formattedItem.replace('д', '')
            formattedItem = Number(formattedItem) * 24 * 60 * 60 * 1000
        }

        if (item.indexOf('ч') !== -1) {
            formattedItem = formattedItem.replace('ч', '')
            formattedItem = Number(formattedItem) * 60 * 60 * 1000
        }

        if (item.indexOf('м') !== -1) {
            formattedItem = formattedItem.replace('м', '')
            formattedItem = Number(formattedItem) * 60 * 1000
        }

        if (item.indexOf('с') !== -1) {
            formattedItem = formattedItem.replace('с', '')
            formattedItem = Number(formattedItem) * 1000
        }

        return formattedItem
    }).reduce((accumulator, item) => accumulator + item)
}