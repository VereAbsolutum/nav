<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Meta tags -->
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- ===============================================================================
        DEFINE THE CSS FILE SRC FOR THE NAVKIT OVERLAY MENU
        (Delete this comment)
    ==================================================================================== -->
    <!-- CSS STYLE -->
    <link rel="stylesheet" href="navkit.min.css" />
    <!-- TITLE -->
    <title>Document</title>
  </head>
  <body>
    <!-- ===============================================================================
        COPY THE FOLLOWING CODE INSIDE YOUR HTML FILE IN YOURS HEADER POSITION 
        (Delete this comment)
    ==================================================================================== -->

    <!--------------------------------- Header ---------------------------->
    <header id="header" class="header header--black ">
      <div class="header__container">
        <!-- Logo -->
        <div id="logo" class="logo">
          <a href="#" class="logo__link">Brand</a>
        </div>
        <!-- End Logo -->

        <!-- Toggle -->
        <div id="toggle" class="toggle">
          <span>menu</span>
          <span>close</span>
          <div class="toggle__wrapper">
            <div class="toggle-bar first-bar"></div>
            <div class="toggle-bar second-bar"></div>
            <div class="toggle-bar third-bar"></div>
          </div>
        </div>

        <!-- Overlay -->
        <div id="overlay" class="overlay overlay--state ">
          <div class="overlay__container">
            <nav id="nav" class="nav">
              <menu id="menu" class="nav__menu">
                <li class="nav__item">
                  <a href="#" class="nav__link">Home</a>
                </li>
                <li class="nav__item">
                  <a href="#" class="nav__link">About</a>
                </li>
                <li class="nav__item">
                  <a href="#" class="nav__link">Portfolio</a>
                </li>
              </menu>
            </nav>
            <nav id="nav-sec" class="nav nav-sec">
              <menu id="menu" class="nav__menu">
                <li class="nav__item">
                  <a href="#" class="nav__link">
                    <i class="fab fa-instagram"></i>
                  </a>
                </li>
                <li class="nav__item">
                  <a href="#" class="nav__link">
                    <i class="fab fa-facebook"></i>
                  </a>
                </li>
                <li class="nav__item">
                  <a href="#" class="nav__link">
                    <i class="fab fa-spotify"></i>
                  </a>
                </li>
              </menu>
            </nav>
          </div>
        </div>
        <!-- End Overlay -->

        <!-- SVG BACKGROUND -->
        <div id="svg-bg" class="svg-bg ">
          <svg
            class="svg-anime"
            viewBox="0 0 100 100"
            height="100%"
            width="100%"
            preserveAspectRatio="none"
          ></svg>
        </div>
        <!-- END SVG BACKGROUND -->
      </div>
      <!-- End Toggle -->
    </header>
    <!--------------------------------- End Header --------------------------------->


    <!-- ===============================================================================
        SET THE SCRIPTS FOR THE NAVKIT OVERLAY MENU TO WORK PROPERLY
        (Delete this comment)
    ==================================================================================== -->
    <!-- SCRIPTS -->
    <script src="anime.min.js"></script>
    <script src="navkit.min.js"></script>
    <script src="custom-scripts.js"></script>

  </body>
</html>
