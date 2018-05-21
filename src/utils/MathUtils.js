import uuid from 'uuid';

let MathUtils = {
    uuid: () => {
        let uuidArr = uuid.v4().split("-");
        return uuidArr.join("");
    }
}

export default MathUtils;