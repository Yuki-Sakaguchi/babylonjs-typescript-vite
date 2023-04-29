import "./style.scss";
import * as BABYLON from "@babylonjs/core";

const main = async () => {
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
    // scene.createDefaultEnvironment();

    // 箱を生成
    const boxSize = 0.2;
    const box = BABYLON.MeshBuilder.CreateBox("box", { size: boxSize });
    box.position.addInPlaceFromFloats(0, 1.6, 0);

    // WebAR対応
    await scene.createDefaultXRExperienceAsync({
      uiOptions: {
        sessionMode: "immersive-ar",
      },
    });

    // レンダリング
    engine.runRenderLoop(() => {
      scene.render();
    });
  }
};

main();
