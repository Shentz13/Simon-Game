<?php

namespace App\Controller;

use App\Entity\HallOfFame;
use App\Form\HallOfFameType;
use App\Repository\HallOfFameRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/hall/of/fame")
 */
class HallOfFameController extends AbstractController
{

    /**
     * @Route("/", name="hallOfFame_index", methods={"GET"})
     */
    public function index(hallOfFameRepository $hallOfFameRepository): Response
    {
        $response = new Response();


        $serializer = $this->container->get('serializer');
        $json = $serializer->serialize($hallOfFameRepository->findAll(), 'json');

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $response->setContent($json);

        return $response;
    }

    /**
     * @Route("/new", name="hall_of_fame_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $response = new Response();

        $serializer = $this->container->get('serializer');
        $hallOfFame = new HallOfFame();
        $form = $this->createForm(HallOfFameType::class, $hallOfFame);
        $form->handleRequest($request);

        $data = json_decode($request->getContent(), true);
        $form->submit($data);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($hallOfFame);
        $entityManager->flush();

        $id = $score->getId();

        $json = $serializer->serialize($id,'json');

        $response->setContent($json);

        return $response;

    }

}
