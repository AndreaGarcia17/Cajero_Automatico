<?php

require'funciones.php';

$cuenta= obtenerServicios();

echo json_encode($cuenta);