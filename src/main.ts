import "./style.scss";
import * as BABYLON from "@babylonjs/core";

const main = () => {
  // キャンバスを取得
  const renderCanvas = <HTMLCanvasElement>(
    document.getElementById("renderCanvas")
  );

  if (renderCanvas) {
    // シーンを作成
    const engine = new BABYLON.Engine(renderCanvas, true);
    const scene = new BABYLON.Scene(engine);

    // カメラとライトを設定
    scene.createDefaultCameraOrLight(true, true, true);
    scene.createDefaultEnvironment();

    // 箱を生成
    const boxSize = 0.2;
    const box = BABYLON.MeshBuilder.CreateBox("box", { size: boxSize });
    box.position.addInPlaceFromFloats(0, boxSize / 2.0, 0);

    // レンダリング
    engine.runRenderLoop(() => {
      scene.render();
    });
  }
};

main();
