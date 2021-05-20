export const formatStockData = (data) => Object.keys(data).map(key => {
    const positiveSentiment = data[key]['POSITIVE'] || 0;
    const negativeSentiment = data[key]['NEGATIVE'] || 0;
    // const neutralSentiment = this.props.data[key]['NEUTRAL'];
    return {
        label: key,
        y: data[key].timesMentioned || 0,
        z: data[key].timesMentioned || 0,
        x: positiveSentiment - negativeSentiment
    }
});