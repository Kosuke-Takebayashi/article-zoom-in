const imgElement = document.querySelector("img"); // 画像
const canvas = document.createElement("canvas"); // canvas要素を生成
const ctx = canvas.getContext("2d"); // 2次元のオブジェクトを作成

// 画像が読み込まれたら以下の処理を実行
imgElement.onload = () => {
    canvas.width = imgElement.width; // 画像の横幅を取得
    canvas.height = imgElement.height; // 画像の高さを取得

    imgElement.addEventListener("mousemove", (event) => {

        const x = event.offsetX;
        const y = event.offsetY;

        console.log(x);

        const centerX = x;
        const centerY = y;
        

        ctx.drawImage(imgElement, -centerX, -centerY, canvas.width * 1.5, canvas.height * 1.5); // 画像を描画する方法を決定

        // canvas要素を画面に表示
        const rectElement = document.createElement("div");
        rectElement.classList.add("rect");
        rectElement.style.cssText = `
  width: ${canvas.width}px;
  height: ${canvas.height}px;
  position: absolute;
  pointer-events: none;
`;

        rectElement.appendChild(canvas);
        document.body.appendChild(rectElement);
    });
};


