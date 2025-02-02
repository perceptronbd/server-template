import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 60 * 60 * 24, checkperiod: 60 * 60 });

export default cache;
