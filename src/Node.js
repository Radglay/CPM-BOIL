
export default class Node {

    constructor(id, minTimeOfOccurrence = null, maxTimeOfOccurence = null, spareTime = null, predecessors = [], successors = []) {
        this.id = id;
        this.minTimeOfOccurrence = minTimeOfOccurrence;
        this.maxTimeOfOccurence = maxTimeOfOccurence;
        this.spareTime = spareTime;
        this.predecessors = predecessors;
        this.successors = successors;
    }
}