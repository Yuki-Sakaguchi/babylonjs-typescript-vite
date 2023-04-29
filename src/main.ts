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

    // カメラを設定
    const camera = new BABYLON.FreeCamera(
      "camera",
      new BABYLON.Vector3(0, 5, -10),
      scene
    );
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(renderCanvas, true);

    // ライトを設定
    const light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    light.intensity = 0.7;

    // 箱を生成
    const boxSize = 0.2;
    const box = BABYLON.MeshBuilder.CreateBox("box", { size: boxSize });
    box.position.addInPlaceFromFloats(0, 0, 0);

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
