class ButtonMethods {
  refresh = () => {
    const refresh = document.querySelector('.refresh button');
    refresh.addEventListener('click', () => {
      window.location.reload();
    });
  }
}
export default ButtonMethods;
