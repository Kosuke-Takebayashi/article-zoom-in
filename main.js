const imgElement = document.querySelector("img");
const canvas = document.createElement("canvas"); // canvas要素を生成
const ctx = canvas.getContext("2d"); // 2次元の描画コンテキストを作成

const value = document.querySelector("#value");
const input = document.querySelector("#magnification");
let magnification = input.value; // 拡大倍率を取得
value.textContent = input.value; // 拡大倍率を表示

/**
 * レンジスライダーを動かしたときに拡大倍率を変更する
 */
input.addEventListener("input", (event) => {
    magnification = input.value;
    value.textContent = event.target.value;
});

/**
 * 元の画像が読み込まれたときに、ズームの処理を実行する
 */
imgElement.onload = () => {
    canvas.width = imgElement.width; // 元の画像の横幅をcanvas要素のwidthに設定
    canvas.height = imgElement.height; // 元の画像の高さをcanvas要素のheightに設定

    /**
     * 画像の上でマウスを動かしたときに、ズームの画像を描画する
     */
    imgElement.addEventListener("mousemove", (event) => {
        if (document.querySelectorAll(".rect")) {
            document.querySelectorAll(".rect").forEach(function (elem) {
                elem.remove();
            });
        }

        let left = event.offsetX;
        let top = event.offsetY;

        let xMaxLength; // x方向にマウスが移動する理論上の限界値
        let yMaxLength; // y方向にマウスが移動する理論上の限界値

        switch (magnification) {
            case "2":
                xMaxLength = imgElement.width * 0.75;
                yMaxLength = imgElement.height * 0.75;
                break;
            default:
                break;
        }

        // 正の方向は、限界値を超えたら限界値で止める
        // 負の方向は、画像の縦横の長さから限界値を引いた値を下回らないようにする
        if (left > xMaxLength) {
            left = xMaxLength;
        }
        if (top > yMaxLength) {
            top = yMaxLength;
        }
        if (left < imgElement.width - xMaxLength) {
            left = imgElement.width - xMaxLength;
        }
        if (top < imgElement.height - yMaxLength) {
            top = imgElement.height - yMaxLength;
        }

        const imageOffsetX = left - (canvas.width - imgElement.width) / 2;
        const imageOffsetY = top - (canvas.height - imgElement.height) / 2;

        const centerX = imageOffsetX * magnification;
        const centerY = imageOffsetY * magnification;

        let positionX;
        let positionY;

        if (magnification !== 1) {
            positionX = -centerX + canvas.width * magnification * 0.5 - canvas.width * 0.5;
            positionY = -centerY + canvas.height * magnification * 0.5 - canvas.height * 0.5;
        } else {
            positionX = -centerX + canvas.width * magnification * 0.5;
            positionY = -centerY + canvas.height * magnification * 0.5;
        }

        // 描画前にcanvasをクリア
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 画像を描画する方法を決定
        ctx.drawImage(imgElement, positionX, positionY, canvas.width * magnification, canvas.height * magnification);

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

    /**
     * 画像からマウスが外れると拡大画像を非表示にする
     */
    imgElement.addEventListener("mouseout", function (event) {
        if (document.querySelectorAll(".rect")) {
            document.querySelectorAll(".rect").forEach(function (elem) {
                elem.remove();
            });
        }
    });
};
