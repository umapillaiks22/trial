package main

import (
	"log"

	"github.com/Yash-Handa/drowsiness_detector/src/backend/server/pkg/api"
)

func main() {
	err := api.StartServer()
	if err != nil {
		log.Fatal("The Server couldn't start:", err)
	}
}
