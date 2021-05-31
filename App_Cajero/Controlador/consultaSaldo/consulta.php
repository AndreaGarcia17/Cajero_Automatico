<?php

require'funciones.php';

$cuenta= obtenerConsulta();

echo json_encode($cuenta);