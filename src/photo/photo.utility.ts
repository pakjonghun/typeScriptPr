export const getConnectOrCreate = (caption) => {
  const connectOrCreate = [];

  if (caption && caption.includes("#")) {

    //| 는 그룹 안에서만 사용!
    const tags = caption.match(/#[ㄱ-ㅎㅏ-ㅣ가-힣\w]+/gi);

    //중간에 | 는 뺀다.  |는 그룹 안에서만 사용할 것.
    const tags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/gi);

    for (let item of tags) {
      connectOrCreate.push({
        where: { hashtag: item },
        create: { hashtag: item },
      });
    }
  }
  return connectOrCreate;
};
