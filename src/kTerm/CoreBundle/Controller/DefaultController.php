<?php

namespace kTerm\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller {

    public function indexAction() {
        return $this->render('kTermCoreBundle:Default:index.html.twig');
    }
}
