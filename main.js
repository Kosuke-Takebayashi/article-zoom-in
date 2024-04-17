const imgElement = document.querySelector("img"); // 画像
const canvas = document.createElement("canvas"); // canvas要素を生成
const ctx = canvas.getContext("2d"); // 2次元のオブジェクトを作成

const value = document.querySelector("#value");
const input = document.querySelector("#pi_input");
let magnification = input.value; // 拡大倍率
value.textContent = input.value;
input.addEventListener("input", (event) => {
    magnification = input.value;
    value.textContent = event.target.value;
});

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

        console.log('left' + event.offsetX);
        console.log('画像' + (imgElement.width - 50));
        console.log(imgElement.width);
        let left = event.offsetX;
        let top = event.offsetY;

        if(left > imgElement.width - 125) {
            left = imgElement.width - 125;
        }
        if(top > imgElement.height - 125) {
            top = imgElement.height - 125;
        }
        if(left <  125) {
            left = 125;
        }
        if(top < 125) {
            top = 125;
        }



        const imageOffsetX = left - (canvas.width - imgElement.width) / 2;
        const imageOffsetY = top - (canvas.height - imgElement.height) / 2;

        const centerX = parseInt(imageOffsetX) * magnification;
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

        ctx.drawImage(imgElement, positionX, positionY, canvas.width * magnification, canvas.height * magnification); // 画像を描画する方法を決定

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
