<?php

require'funciones.php';

$retiro= obtenerRetiro();

echo json_encode($retiro);