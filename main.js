const imgElement = document.querySelector("img"); // 画像
const canvas = document.createElement("canvas"); // canvas要素を生成
const ctx = canvas.getContext("2d"); // 2次元のオブジェクトを作成
const magnification = 2; // 拡大倍率

// 画像が読み込まれたら以下の処理を実行
imgElement.onload = () => {
    canvas.width = imgElement.width; // 画像の横幅を取得
    canvas.height = imgElement.height; // 画像の高さを取得

    imgElement.addEventListener("mousemove", (event) => {
        if (document.querySelectorAll(".rect")) {
            document.querySelectorAll(".rect").forEach(function (elem) {
                elem.remove();
            });
        }

        console.log(event.offsetX);

        const imageOffsetX = event.offsetX - (canvas.width - imgElement.width) / 2;
        const imageOffsetY = event.offsetY - (canvas.height - imgElement.height) / 2;

        console.log("元の画像の原点からのX距離" + imageOffsetX);

        const centerX = parseInt(imageOffsetX) * magnification;
        const centerY = imageOffsetY * magnification;

        console.log("原点からの距離 * 拡大倍率" + centerX);

        ctx.drawImage(
            imgElement,
            -centerX + canvas.width * magnification * 0.5 - canvas.width * 0.5,
            -centerY + canvas.height * magnification * 0.5 - canvas.height * 0.5,
            canvas.width * magnification,
            canvas.height * magnification
        ); // 画像を描画する方法を決定

        console.log("描画の位置" + (-centerX + canvas.width * magnification * 0.5));

        // canvas要素を画面に表示
        const rectElement = document.createElement("div");
        rectElement.classList.add("rect");

        rectElement.style.cssText = `
        display: inline-block;
  width: ${canvas.width}px;
  height: ${canvas.height}px;
  position: absolute;
  pointer-events: none;
  border: 1px solid #111;
`;
        rectElement.appendChild(canvas);
        document.body.appendChild(rectElement);
    });

    // 画像からマウスが外れると非表示にする
    imgElement.addEventListener("mouseout", function (event) {
        if (document.querySelectorAll(".rect")) {
            document.querySelectorAll(".rect").forEach(function (elem) {
                elem.remove();
            });
        }
    });
};
