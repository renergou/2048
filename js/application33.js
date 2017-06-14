/**
 * Created by apple- on 2017/6/13.
 */
window.requestAnimationFrame(function () {
    new GameManager(3, KeyboardInputManager, HTMLActuator, LocalStorageManager);
});
