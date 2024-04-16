const imgElement = document.querySelector("img"); // 画像
const canvas = document.createElement("canvas"); // canvas要素を生成
const ctx = canvas.getContext("2d"); // 2次元のオブジェクトを作成
const rectWrapper = document.querySelector(".rect-wrapper");
const magnification = 1.75;

// 画像が読み込まれたら以下の処理を実行
imgElement.onload = () => {
    canvas.width = imgElement.width; // 画像の横幅を取得
    canvas.height = imgElement.height; // 画像の高さを取得

    imgElement.addEventListener("mousemove", (event) => {

        if(document.querySelectorAll('.rect')) {
            document.querySelectorAll('.rect').forEach(function(elem) {
                elem.remove();
            })
        }

        const x = event.offsetX;
        const y = event.offsetY;

        const centerX = x;
        const centerY = y;

        ctx.drawImage(imgElement, -centerX, -centerY, canvas.width * magnification, canvas.height * magnification); // 画像を描画する方法を決定

        // canvas要素を画面に表示
        const rectElement = document.createElement("div");
        rectElement.classList.add("rect");
        rectElement.style.cssText = `
        display: inline-block;
  width: ${canvas.width}px;
  height: ${canvas.height}px;
  position: absolute;
  pointer-events: none;
`;
rectWrapper.appendChild(rectElement);
        rectElement.appendChild(canvas);
        document.body.appendChild(rectElement);
    });

    imgElement.addEventListener('mouseout', function(event) {
        if (document.querySelectorAll(".rect")) {
            document.querySelectorAll(".rect").forEach(function (elem) {
                elem.remove();
            });
        }
    })
};
